#!/usr/bin/env python3
"""
清洗 WebCafe 导出数据：
1. 去掉 UI 噪声，提取可读正文文本
2. 抽取正文里的外链 URL
3. 识别 VIP 无权限内容
4. 输出 cleaned.json / cleaned.jsonl / 清洗报告.md
"""

from __future__ import annotations

import argparse
import json
import re
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List
from urllib.parse import urlparse


LOCK_MARKERS = (
    "暂无权限查看",
    "本内容仅对VIP会员开放",
    "立即开通 VIP 会员",
    "data-headlessui-portal",
)

AVATAR_PATH_MARKERS = (
    "/message/user-img/",
)

URL_RE = re.compile(r"""https?://[^\s<>"')]+""", re.IGNORECASE)
HREF_RE = re.compile(r"""href\s*=\s*["']([^"']+)["']""", re.IGNORECASE)
IMAGE_EXT_RE = re.compile(r"""\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?.*)?$""", re.IGNORECASE)
HOST_VALID_RE = re.compile(r"""^[a-z0-9.-]+$""")


def dedupe_keep_order(items: List[str]) -> List[str]:
    seen = set()
    out: List[str] = []
    for item in items:
        if item not in seen:
            seen.add(item)
            out.append(item)
    return out


class HtmlTextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: List[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        attr_map = dict(attrs)
        tag = tag.lower()

        if tag in {"div", "p", "section", "article", "h1", "h2", "h3", "h4", "h5", "h6"}:
            self.parts.append("\n")
        elif tag == "br":
            self.parts.append("\n")
        elif tag in {"ul", "ol"}:
            self.parts.append("\n")
        elif tag == "li":
            self.parts.append("\n- ")
        elif tag == "blockquote":
            self.parts.append("\n> ")
        elif tag == "hr":
            self.parts.append("\n---\n")
        elif tag == "img":
            src = (attr_map.get("src") or "").strip()
            alt = (attr_map.get("alt") or "").strip()
            if not src:
                return
            if src.startswith("data:image/"):
                return
            if any(marker in src for marker in AVATAR_PATH_MARKERS):
                return
            if alt and alt.lower() not in {"图片", "image"}:
                self.parts.append(f"\n[图片] {alt} {src}\n")
            else:
                self.parts.append(f"\n[图片] {src}\n")

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() in {"div", "p", "li", "ul", "ol", "blockquote"}:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if data:
            self.parts.append(data)

    def get_text(self) -> str:
        raw = "".join(self.parts)
        raw = unescape(raw)
        raw = raw.replace("\u00a0", " ")
        raw = raw.replace("\r\n", "\n").replace("\r", "\n")

        lines = [line.strip() for line in raw.split("\n")]
        cleaned_lines: List[str] = []
        for line in lines:
            if not line:
                cleaned_lines.append("")
                continue
            # 去掉明显噪声文字
            if line in {"Head Image"}:
                continue
            cleaned_lines.append(re.sub(r"\s+", " ", line))

        text = "\n".join(cleaned_lines)
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text.strip()


def extract_links(content_html: str) -> List[str]:
    links: List[str] = []
    for m in HREF_RE.finditer(content_html):
        link = unescape(m.group(1)).strip()
        if link.startswith("http://") or link.startswith("https://"):
            links.append(link)
    return dedupe_keep_order(links)


def extract_urls_from_text(text: str) -> List[str]:
    return dedupe_keep_order(URL_RE.findall(text))


def is_image_url(url: str) -> bool:
    return bool(IMAGE_EXT_RE.search(url))


def is_webcafe_internal(url: str) -> bool:
    host = (urlparse(url).netloc or "").lower()
    return host.endswith("web.cafe")


def normalize_links(links: List[str]) -> List[str]:
    out: List[str] = []
    for link in links:
        link = link.strip()
        link = link.rstrip(".,;:!?)]}，。；：！？、）】》")
        if not link.startswith(("http://", "https://")):
            continue
        if is_image_url(link):
            continue
        out.append(link)
    return dedupe_keep_order(out)


def external_only_links(links: List[str]) -> List[str]:
    return [link for link in links if not is_webcafe_internal(link)]


def extract_domains(links: List[str]) -> List[str]:
    domains: List[str] = []
    for link in links:
        host = (urlparse(link).netloc or "").lower().strip()
        if not host:
            continue
        if host.startswith("www."):
            host = host[4:]
        if "%" in host:
            continue
        if not HOST_VALID_RE.match(host):
            continue
        if "." not in host:
            continue
        domains.append(host)
    return dedupe_keep_order(domains)


def extract_useful_images(images_field) -> List[str]:
    if not isinstance(images_field, list):
        return []

    out: List[str] = []
    for item in images_field:
        if not isinstance(item, dict):
            continue
        src = (item.get("src") or "").strip()
        if not src:
            continue
        if src.startswith("data:image/"):
            continue
        if any(marker in src for marker in AVATAR_PATH_MARKERS):
            continue
        out.append(src)
    return dedupe_keep_order(out)


def is_locked_content(content_html: str) -> bool:
    return any(marker in content_html for marker in LOCK_MARKERS)


def clean_record(record: Dict) -> Dict:
    content_html = str(record.get("contentHtml") or "")
    locked = is_locked_content(content_html)

    if locked:
        content_text = ""
    else:
        parser = HtmlTextExtractor()
        parser.feed(content_html)
        content_text = parser.get_text()

    links = normalize_links(extract_links(content_html) + extract_urls_from_text(content_text))
    outbound_links = external_only_links(links)
    outbound_domains = extract_domains(outbound_links)

    cleaned = {
        "id": str(record.get("id") or "").strip(),
        "title": str(record.get("title") or "").strip(),
        "url": str(record.get("url") or "").strip(),
        "author": str(record.get("author") or "").strip(),
        "date": str(record.get("date") or "").strip(),
        "savedAt": str(record.get("savedAt") or "").strip(),
        "tags": record.get("tags") if isinstance(record.get("tags"), list) else [],
        "is_locked": locked,
        "content_text": content_text,
        "content_text_len": len(content_text),
        "links": links,
        "external_links": outbound_links,
        "external_domains": outbound_domains,
        "image_urls": extract_useful_images(record.get("images")),
        "raw_content_html_len": len(content_html),
    }
    return cleaned


def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def write_jsonl(path: Path, data: List[Dict]) -> None:
    with path.open("w", encoding="utf-8") as f:
        for item in data:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")


def write_domains(path: Path, cleaned: List[Dict]) -> None:
    counts: Dict[str, int] = {}
    for item in cleaned:
        for domain in item.get("external_domains", []):
            counts[domain] = counts.get(domain, 0) + 1

    ordered = sorted(counts.items(), key=lambda x: (-x[1], x[0]))
    lines = ["# 域名\t出现次数"]
    lines += [f"{domain}\t{count}" for domain, count in ordered]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def build_report(cleaned: List[Dict], source_path: Path) -> str:
    total = len(cleaned)
    locked = sum(1 for x in cleaned if x["is_locked"])
    unlocked = total - locked
    with_text = sum(1 for x in cleaned if x["content_text_len"] > 0)
    total_links = sum(len(x["links"]) for x in cleaned)
    total_external_links = sum(len(x["external_links"]) for x in cleaned)
    unique_external_domains = dedupe_keep_order(
        [d for item in cleaned for d in item.get("external_domains", [])]
    )
    total_images = sum(len(x["image_urls"]) for x in cleaned)
    avg_text_len = round(sum(x["content_text_len"] for x in cleaned) / total, 1) if total else 0
    max_item = max(cleaned, key=lambda x: x["content_text_len"], default=None)

    lines = [
        "# WebCafe 导出数据清洗报告",
        "",
        f"- 源文件：`{source_path}`",
        f"- 总记录数：{total}",
        f"- 可读记录（非锁）：{unlocked}",
        f"- 锁定记录（VIP 无权限）：{locked}",
        f"- 有正文文本的记录：{with_text}",
        f"- 文本平均长度：{avg_text_len} 字符",
        f"- 提取到的链接总数：{total_links}",
        f"- 提取到的外站链接总数：{total_external_links}",
        f"- 外站唯一域名数：{len(unique_external_domains)}",
        f"- 提取到的图片链接总数（已过滤头像）：{total_images}",
    ]

    if max_item:
        lines += [
            "",
            "## 最长正文样本",
            f"- ID：`{max_item['id']}`",
            f"- 标题：{max_item['title']}",
            f"- URL：{max_item['url']}",
            f"- 正文长度：{max_item['content_text_len']}",
        ]

    lines += [
        "",
        "## 说明",
        "- 已移除大部分前端 UI 噪声（如权限弹窗结构、头像图片干扰）。",
        "- 对于锁定内容，仅保留元信息（标题/URL/时间），正文置空。",
        "- 图片内文字（OCR）尚未处理，后续可补充图片下载 + OCR 管道。",
    ]
    return "\n".join(lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="清洗 webcafe 导出 JSON")
    parser.add_argument("--input", required=True, help="输入 JSON 文件路径")
    parser.add_argument("--out-json", required=True, help="输出 cleaned.json 路径")
    parser.add_argument("--out-jsonl", required=True, help="输出 cleaned.jsonl 路径")
    parser.add_argument("--out-report", required=True, help="输出清洗报告路径")
    parser.add_argument("--out-domains", help="输出外链域名统计文件路径（可选）")
    args = parser.parse_args()

    in_path = Path(args.input).expanduser().resolve()
    out_json = Path(args.out_json).expanduser().resolve()
    out_jsonl = Path(args.out_jsonl).expanduser().resolve()
    out_report = Path(args.out_report).expanduser().resolve()
    out_domains = Path(args.out_domains).expanduser().resolve() if args.out_domains else None

    data = json.loads(in_path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("输入 JSON 顶层必须是数组")

    cleaned = [clean_record(item) for item in data]

    write_json(out_json, cleaned)
    write_jsonl(out_jsonl, cleaned)
    out_report.write_text(build_report(cleaned, in_path), encoding="utf-8")
    if out_domains:
        write_domains(out_domains, cleaned)

    print(f"Done. total={len(cleaned)}")
    print(f"JSON: {out_json}")
    print(f"JSONL: {out_jsonl}")
    print(f"REPORT: {out_report}")
    if out_domains:
        print(f"DOMAINS: {out_domains}")


if __name__ == "__main__":
    main()
