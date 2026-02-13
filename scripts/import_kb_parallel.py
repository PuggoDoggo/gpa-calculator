#!/usr/bin/env python3
"""
知识库导入脚本（带并发保护）。

默认采用安全模式：
- `--parallel` 默认 1（单进程写入同一个 KB）
- 若 `--parallel > 1`，必须显式传 `--allow-multiprocess`

说明：
- 该脚本通过 `knowledge-mcp shell` 执行 `add` 命令。
- 多进程并发写同一个 JSON 存储型 KB 可能出现状态竞争，请谨慎开启。
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import shlex
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

FILTER_RE = re.compile(r"Adding|success|Error|failed|Exception|RuntimeError", re.IGNORECASE)


def load_status_map(kb_root: Path, kb_name: str) -> dict[str, str]:
    status_file = kb_root / "kbs" / kb_name / "kv_store_doc_status.json"
    if not status_file.exists():
        return {}
    try:
        data = json.loads(status_file.read_text(encoding="utf-8"))
    except Exception:
        return {}
    out: dict[str, str] = {}
    for k, v in data.items():
        if isinstance(v, dict):
            out[k] = str(v.get("status", "unknown"))
        else:
            out[k] = "unknown"
    return out


def build_env(
    max_parallel_insert: int | None,
    max_async: int | None,
    embedding_func_max_async: int | None,
    embedding_batch_num: int | None,
) -> dict[str, str]:
    env = os.environ.copy()
    if max_parallel_insert is not None:
        env["MAX_PARALLEL_INSERT"] = str(max_parallel_insert)
    if max_async is not None:
        env["MAX_ASYNC"] = str(max_async)
    if embedding_func_max_async is not None:
        env["EMBEDDING_FUNC_MAX_ASYNC"] = str(embedding_func_max_async)
    if embedding_batch_num is not None:
        env["EMBEDDING_BATCH_NUM"] = str(embedding_batch_num)
    return env


def run_import(
    kb_root: Path,
    kb_name: str,
    file_path: str,
    config_path: str,
    env: dict[str, str],
) -> tuple[str, int, str]:
    cmd = f"add {kb_name} {shlex.quote(file_path)} text\nexit\n"
    proc = subprocess.run(
        ["knowledge-mcp", "--config", config_path, "shell"],
        cwd=str(kb_root),
        env=env,
        input=cmd,
        text=True,
        capture_output=True,
    )
    raw = (proc.stdout or "") + (proc.stderr or "")
    lines = [ln for ln in raw.splitlines() if FILTER_RE.search(ln)]
    if not lines:
        lines = raw.splitlines()[-10:]
    return (os.path.basename(file_path), proc.returncode, "\n".join(lines))


def main() -> None:
    ap = argparse.ArgumentParser(description="并发导入 KB")
    ap.add_argument("kb_name", help="知识库名称")
    ap.add_argument("glob_pattern", help="导入文件通配符，例如 exports/xxx/*.md")
    ap.add_argument(
        "-p",
        "--parallel",
        type=int,
        default=1,
        help="并发数（默认1，推荐）",
    )
    ap.add_argument(
        "--allow-multiprocess",
        action="store_true",
        help="允许 parallel>1 的多进程导入（有竞争风险）",
    )
    ap.add_argument(
        "--config",
        default="config.yaml",
        help="knowledge-mcp 配置文件路径（相对 ~/knowledge-bases）",
    )
    ap.add_argument("--max-parallel-insert", type=int, default=None)
    ap.add_argument("--max-async", type=int, default=None)
    ap.add_argument("--embedding-func-max-async", type=int, default=None)
    ap.add_argument("--embedding-batch-num", type=int, default=None)
    args = ap.parse_args()

    if args.parallel < 1:
        raise ValueError("--parallel 必须 >= 1")
    for name in [
        "max_parallel_insert",
        "max_async",
        "embedding_func_max_async",
        "embedding_batch_num",
    ]:
        v = getattr(args, name)
        if v is not None and v < 1:
            raise ValueError(f"--{name.replace('_', '-')} 必须 >= 1")

    if args.parallel > 1 and not args.allow_multiprocess:
        print("检测到 parallel > 1，默认安全模式已阻止。")
        print("原因：多进程并发写同一个 JSON 存储 KB 可能导致状态竞争。")
        print("如确需继续，请显式添加参数：--allow-multiprocess")
        return

    kb_root = Path.home() / "knowledge-bases"
    config_path = args.config
    files = sorted(glob.glob(str(kb_root / args.glob_pattern)))
    if not files:
        print(f"未找到文件: {kb_root / args.glob_pattern}")
        return

    env = build_env(
        max_parallel_insert=args.max_parallel_insert,
        max_async=args.max_async,
        embedding_func_max_async=args.embedding_func_max_async,
        embedding_batch_num=args.embedding_batch_num,
    )

    status_map = load_status_map(kb_root, args.kb_name)
    pending: list[str] = []
    skipped = 0
    for f in files:
        base = os.path.basename(f)
        st = status_map.get(base, "new")
        if st == "processed":
            skipped += 1
            continue
        pending.append(f)

    print(f"总文件: {len(files)}")
    print(f"已处理跳过(processed): {skipped}")
    print(f"待导入/重试: {len(pending)}")
    print(f"并发数: {args.parallel}")
    print(f"配置文件: {config_path}")
    print(
        "并发参数覆盖: "
        f"MAX_PARALLEL_INSERT={env.get('MAX_PARALLEL_INSERT', '(默认)')}, "
        f"MAX_ASYNC={env.get('MAX_ASYNC', '(默认)')}, "
        f"EMBEDDING_FUNC_MAX_ASYNC={env.get('EMBEDDING_FUNC_MAX_ASYNC', '(默认)')}, "
        f"EMBEDDING_BATCH_NUM={env.get('EMBEDDING_BATCH_NUM', '(默认)')}"
    )
    if args.parallel > 1:
        print("警告：你已启用多进程写入，结果可能不稳定。")

    if not pending:
        print("没有需要导入的文件。")
        return

    ok = 0
    fail = 0
    with ThreadPoolExecutor(max_workers=args.parallel) as ex:
        futs = [
            ex.submit(run_import, kb_root, args.kb_name, f, config_path, env)
            for f in pending
        ]
        for i, fut in enumerate(as_completed(futs), start=1):
            name, code, out = fut.result()
            print(f"\n=== [{i}/{len(pending)}] {name} ===")
            print(out)
            if code == 0:
                ok += 1
            else:
                fail += 1

    print("\n=== 导入命令执行完成 ===")
    print(f"命令成功: {ok}")
    print(f"命令失败: {fail}")
    print("请再运行: ~/knowledge-bases/verify_kb_status.sh <kb_name> 检查 processed/failed")


if __name__ == "__main__":
    main()
