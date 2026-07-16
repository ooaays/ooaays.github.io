#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path('kka-lab-maya/jeremia/eksplorasi-markov-chain')
EXTS = {'.txt', '.html'}

def fix_text(text: str) -> str:
    # Remove newlines that split a word: letter + newline + lowercase letter
    return re.sub(r'(?<=[A-Za-z0-9])\n(?=[a-z])', '', text)

def main():
    changed = []
    for p in ROOT.rglob('*'):
        if p.suffix.lower() in EXTS and p.is_file():
            s = p.read_text(encoding='utf-8')
            fixed = fix_text(s)
            if fixed != s:
                bak = p.with_suffix(p.suffix + '.bak')
                p.rename(bak)
                bak.write_text(s, encoding='utf-8')
                p.write_text(fixed, encoding='utf-8')
                changed.append(str(p))
    if changed:
        print('Fixed files:')
        for c in changed:
            print(c)
    else:
        print('No changes needed')

if __name__ == '__main__':
    main()
