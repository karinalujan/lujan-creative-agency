"""Validate data/removed-posts.csv and publish data/removed-posts.json.

The log is filled in by hand. Each row is one of your own posts that a
platform removed, hid, or restricted, with a screenshot as evidence.
Nothing here is generated or guessed.
"""
import csv
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "data" / "removed-posts.csv"
JSON_PATH = ROOT / "data" / "removed-posts.json"
EVIDENCE_DIR = (ROOT / "evidence").resolve()
COLUMNS = ["date", "platform", "post_link", "what_happened", "evidence_file", "notes"]


def main() -> int:
    errors = []
    rows = []
    with CSV_PATH.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames != COLUMNS:
            print(f"Header must be exactly: {','.join(COLUMNS)}")
            return 1
        for n, raw_row in enumerate(reader, start=2):
            if None in raw_row:
                errors.append(f"Line {n}: too many columns (wrap commas inside quotes)")
                continue
            row = {k: (raw_row.get(k) or "").strip() for k in COLUMNS}
            if not any(row.values()):
                continue
            try:
                date.fromisoformat(row["date"])
            except ValueError:
                errors.append(f"Line {n}: date must be YYYY-MM-DD")
            for field in ("platform", "what_happened"):
                if not row[field]:
                    errors.append(f"Line {n}: {field} is required")
            link = row["post_link"]
            if link and not (link.startswith("https://") or link.startswith("http://")):
                errors.append(f"Line {n}: post_link must start with https:// or http://")
            ev = row["evidence_file"]
            if ev:
                ev_path = (EVIDENCE_DIR / ev).resolve()
                if Path(ev).name != ev or ev_path.parent != EVIDENCE_DIR:
                    errors.append(f"Line {n}: evidence_file must be a plain filename inside evidence/")
                elif not ev_path.is_file():
                    errors.append(f"Line {n}: evidence/{ev} not found")
            rows.append(row)

    if errors:
        print("\n".join(errors))
        return 1

    rows.sort(key=lambda r: r["date"], reverse=True)
    JSON_PATH.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Published {len(rows)} entries")
    return 0


if __name__ == "__main__":
    sys.exit(main())
