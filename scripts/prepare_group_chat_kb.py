#!/usr/bin/env python3
"""
将微信群导出文本转换为知识库可导入的 Markdown 分片（不去重）。
同时执行原文备份与结构化 JSONL 导出。
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


MESSAGE_RE = re.compile(
    r"(?ms)^([^\n]+)\n(?:\1\n)?(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\n\n查看前后消息\n"
    r"(.*?)(?=^[^\n]+\n(?:[^\n]+\n)?\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\n|\Z)"
)


@dataclass
class Message:
    message_id: int
    speaker: str
    timestamp: str
    content: str


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def parse_messages(text: str) -> list[Message]:
    messages: list[Message] = []
    idx = 1
    for m in MESSAGE_RE.finditer(text):
        speaker = m.group(1).strip()
        timestamp = m.group(2)
        content = m.group(3).strip()
        messages.append(Message(idx, speaker, timestamp, content))
        idx += 1
    return messages


def normalize_for_exact_dup(text: str) -> str:
    t = text.lower()
    t = re.sub(r"https?://\S+", "<url>", t)
    t = re.sub(r"[\u3000\t\r\n\s]+", "", t)
    t = re.sub(r"[“”\"'`…,.!，。！？:：;；()（）\[\]【】<>《》-]+", "", t)
    return t


def dump_jsonl(messages: list[Message], out_path: Path, source_name: str) -> None:
    with out_path.open("w", encoding="utf-8") as f:
        for m in messages:
            rec = {
                "source": source_name,
                "message_id": m.message_id,
                "speaker": m.speaker,
                "timestamp": m.timestamp,
                "content": m.content,
            }
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")


def write_kb_parts(
    messages: list[Message],
    export_dir: Path,
    source_file: Path,
    source_sha256: str,
    chunk_size: int,
) -> list[Path]:
    export_dir.mkdir(parents=True, exist_ok=True)

    # 清理旧分片（只清理当前源文件前缀）
    prefix = source_file.stem
    for p in export_dir.glob(f"{prefix}_part*.md"):
        p.unlink()
    overview = export_dir / f"{prefix}_overview.md"
    if overview.exists():
        overview.unlink()

    part_files: list[Path] = []
    total = len(messages)

    # 总览
    speakers = Counter(m.speaker for m in messages)
    overview_content = [
        f"# 群聊知识库导入总览：{source_file.name}",
        "",
        f"- 来源文件: `{source_file}`",
        f"- 文件哈希(SHA256): `{source_sha256}`",
        "- 去重策略: `none`（按要求保留原始重复）",
        f"- 总消息数: {total}",
        f"- 分片大小: 每片 {chunk_size} 条",
        f"- 预计分片数: {(total + chunk_size - 1) // chunk_size}",
        "",
        "## 发言人 Top 20",
        "",
    ]
    for name, c in speakers.most_common(20):
        overview_content.append(f"- {name}: {c}")

    overview.write_text("\n".join(overview_content) + "\n", encoding="utf-8")
    part_files.append(overview)

    # 分片
    part_no = 1
    for i in range(0, total, chunk_size):
        chunk = messages[i : i + chunk_size]
        start_id = chunk[0].message_id
        end_id = chunk[-1].message_id
        out = export_dir / f"{source_file.stem}_part{part_no:02d}.md"

        lines: list[str] = [
            f"# 群聊分片 {part_no:02d}: 消息 {start_id}-{end_id}",
            "",
            f"- 来源文件: `{source_file.name}`",
            f"- 来源哈希: `{source_sha256}`",
            "- 去重策略: `none`",
            f"- 分片消息数: {len(chunk)}",
            "",
        ]

        for m in chunk:
            lines.extend(
                [
                    f"## 消息 {m.message_id:06d}",
                    f"- 发言人: {m.speaker}",
                    f"- 时间: {m.timestamp}",
                    "- 内容:",
                    "```text",
                    m.content,
                    "```",
                    "",
                ]
            )

        out.write_text("\n".join(lines), encoding="utf-8")
        part_files.append(out)
        part_no += 1

    return part_files


def write_report(
    report_path: Path,
    source_file: Path,
    backup_path: Path,
    source_sha: str,
    backup_sha: str,
    messages: list[Message],
    jsonl_path: Path,
    export_dir: Path,
    part_files: list[Path],
) -> None:
    speakers = Counter(m.speaker for m in messages)

    exact_dup_groups = defaultdict(list)
    for m in messages:
        key = normalize_for_exact_dup(m.content)
        if key:
            exact_dup_groups[key].append(m)

    dup_groups = [v for v in exact_dup_groups.values() if len(v) > 1]
    dup_count = sum(len(v) for v in dup_groups)

    lines = [
        f"# 群聊知识库准备报告：{source_file.name}",
        "",
        "## 执行结果",
        "",
        f"- 原始文件: `{source_file}`",
        f"- 备份文件: `{backup_path}`",
        f"- 原始哈希: `{source_sha}`",
        f"- 备份哈希: `{backup_sha}`",
        f"- 哈希一致: `{source_sha == backup_sha}`",
        "- 去重策略: `none`（本次按要求不去重）",
        f"- 解析消息数: {len(messages)}",
        f"- 发言人数: {len(speakers)}",
        f"- 结构化 JSONL: `{jsonl_path}`",
        f"- 知识库分片目录: `{export_dir}`",
        f"- 分片文件数（含overview）: {len(part_files)}",
        "",
        "## 重复内容观测（仅统计，不删除）",
        "",
        f"- 精确重复组数: {len(dup_groups)}",
        f"- 重复消息总条数: {dup_count}",
        "- 说明: 该统计仅用于后续多群合并时参考，本次不做任何去重处理。",
        "",
        "## 发言人 Top 20",
        "",
    ]
    for name, c in speakers.most_common(20):
        lines.append(f"- {name}: {c}")

    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser(description="准备群聊文本为知识库导入格式（不去重）")
    ap.add_argument("--input", required=True, help="输入 txt 文件路径")
    ap.add_argument("--docs-dir", default="docs", help="文档输出目录")
    ap.add_argument("--kb-export-dir", required=True, help="知识库 markdown 导出目录")
    ap.add_argument("--chunk-size", type=int, default=80, help="每个分片包含的消息条数")
    args = ap.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    docs_dir = Path(args.docs_dir).resolve()
    kb_export_dir = Path(args.kb_export_dir).expanduser().resolve()

    if not input_path.exists():
        raise FileNotFoundError(f"输入文件不存在: {input_path}")

    now = datetime.now().strftime("%Y%m%d-%H%M%S")

    # 1) 原文备份（禁止修改原文）
    backup_dir = docs_dir / "backups"
    backup_dir.mkdir(parents=True, exist_ok=True)
    backup_path = backup_dir / f"{input_path.stem}.backup-{now}{input_path.suffix}"
    shutil.copy2(input_path, backup_path)

    source_sha = sha256_file(input_path)
    backup_sha = sha256_file(backup_path)

    # 2) 解析 + 结构化（不去重）
    text = input_path.read_text(encoding="utf-8")
    messages = parse_messages(text)
    if not messages:
        raise RuntimeError("未解析到消息，请检查导出文本格式")

    jsonl_path = docs_dir / f"{input_path.stem}.结构化.不去重.jsonl"
    dump_jsonl(messages, jsonl_path, input_path.name)

    # 3) 生成 KB 分片（不去重）
    part_files = write_kb_parts(
        messages=messages,
        export_dir=kb_export_dir,
        source_file=input_path,
        source_sha256=source_sha,
        chunk_size=args.chunk_size,
    )

    # 4) 生成报告
    report_path = docs_dir / f"{input_path.stem}.知识库准备报告.md"
    write_report(
        report_path=report_path,
        source_file=input_path,
        backup_path=backup_path,
        source_sha=source_sha,
        backup_sha=backup_sha,
        messages=messages,
        jsonl_path=jsonl_path,
        export_dir=kb_export_dir,
        part_files=part_files,
    )

    print("=== DONE ===")
    print(f"input: {input_path}")
    print(f"backup: {backup_path}")
    print(f"hash_match: {source_sha == backup_sha}")
    print(f"messages: {len(messages)}")
    print(f"jsonl: {jsonl_path}")
    print(f"kb_export_dir: {kb_export_dir}")
    print(f"kb_parts: {len(part_files)}")
    print(f"report: {report_path}")


if __name__ == "__main__":
    main()
