#!/usr/bin/env python3
"""Improve tokenization fixer by reflowing paragraphs of many short fragments.

Heuristic:
- Operate on .txt files under kka-lab-maya/jeremia/eksplorasi-markov-chain
- For each paragraph (blocks separated by blank lines), if >30% of lines are short
  (<=4 chars) and paragraph has >=4 lines, join lines with a space to reflow text.
"""
from pathlib import Path
import re

ROOT = Path('kka-lab-maya/jeremia/eksplorasi-markov-chain')
EXTS = {'.txt'}

def should_reflow(lines):
    if len(lines) < 4:
        return False
    short = sum(1 for l in lines if len(l.strip()) <= 4 and re.match(r'^[A-Za-z]+$', l.strip()))
    return (short / len(lines)) >= 0.3

def reflow_paragraph(lines):
    # join lines with single space, collapse repeated spaces
    text = ' '.join(l.strip() for l in lines)
    text = re.sub(r"\s+", ' ', text)
    return text.strip()

def process_file(p: Path):
    s = p.read_text(encoding='utf-8')
    parts = re.split(r'(\n\s*\n)', s)  # keep separators
    changed = False
    out = []
    i = 0
    while i < len(parts):
        block = parts[i]
        if i+1 < len(parts) and re.match(r'\n\s*\n', parts[i+1]):
            sep = parts[i+1]
            i += 2
        else:
            sep = ''
            i += 1
        lines = block.splitlines()
        if should_reflow(lines):
            out.append(reflow_paragraph(lines) + sep)
            changed = True
        else:
            out.append(block + sep)
    new = ''.join(out)
    if new != s:
        bak = p.with_suffix(p.suffix + '.bak')
        p.rename(bak)
        bak.write_text(s, encoding='utf-8')
        p.write_text(new, encoding='utf-8')
        return True
    return False

def main():
    changed_files = []
    for p in ROOT.rglob('*.txt'):
        if p.is_file():
            if process_file(p):
                changed_files.append(str(p))
    if changed_files:
        print('Reflowed paragraphs in:')
        for f in changed_files:
            print(f)
    else:
        print('No reflows applied')

if __name__ == '__main__':
    main()
