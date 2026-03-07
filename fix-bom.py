"""Strip BOM and fix remaining encoding issues. Run from repo root."""
import os

files = [
    r"app\analytics\sonic-thread\page.jsx",
    r"app\analytics\callback-engine\page.jsx",
    r"app\analytics\catnip-map\page.jsx",
    r"app\analytics\dimensional-map\page.jsx",
    r"app\social\page.jsx",
]

for f in files:
    if not os.path.exists(f):
        print(f"SKIP: {f}")
        continue
    with open(f, 'rb') as fh:
        raw = fh.read()
    # Strip BOM if present
    if raw.startswith(b'\xef\xbb\xbf'):
        raw = raw[3:]
    # Replace replacement characters
    text = raw.decode('utf-8', errors='replace')
    text = text.replace('\ufffd', '')
    with open(f, 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(text)
    print(f"FIXED: {f}")

print("\nDone. Run: npm run build")
