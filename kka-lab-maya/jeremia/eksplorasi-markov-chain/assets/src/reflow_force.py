#!/usr/bin/env python3
"""Force reflow: replace single newlines with spaces, keep blank-line paragraphs.

Use with caution — this joins lines into paragraphs and undoes token-per-line
tokenization. Backups (.bak) are created for changed files.
"""
from pathlib import Path
import re

ROOT = Path('kka-lab-maya/jeremia/eksplorasi-markov-chain')

def reflow_text(s: str) -> str:
    # Replace single newlines (not double) with spaces
    # Approach: temporarily mark double-newlines, replace remaining newlines with space,
    # then restore double-newlines.
    marker = '__PARA_BREAK__'
    s2 = s.replace('\r\n', '\n')
    s2 = s2.replace('\n\n', marker)
    s2 = s2.replace('\n', ' ')
    s2 = s2.replace(marker, '\n\n')
    # collapse repeated spaces
    s2 = re.sub(r"[ \t]+", ' ', s2)
    # normalize spaces before punctuation
    s2 = re.sub(r"\s+([,.;:!?])", r"\1", s2)
    return s2

def main():
    changed = []
    for p in ROOT.rglob('*.txt'):
        s = p.read_text(encoding='utf-8')
        new = reflow_text(s)
        if new != s:
            bak = p.with_suffix(p.suffix + '.bak')
            p.rename(bak)
            bak.write_text(s, encoding='utf-8')
            p.write_text(new, encoding='utf-8')
            changed.append(str(p))
    if changed:
        print('Reflowed files:')
        for f in changed:
            print(f)
    else:
        print('No files changed')

if __name__ == '__main__':
    main()
