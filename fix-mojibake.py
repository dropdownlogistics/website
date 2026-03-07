"""Fix mojibake in JSX files by re-encoding. Run from repo root: python fix-mojibake.py"""
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
    
    # Read as UTF-8
    with open(f, 'rb') as fh:
        raw = fh.read()
    
    text = raw.decode('utf-8', errors='replace')
    
    # Try to fix by re-encoding through cp1252
    # This reverses the double-encoding: UTF-8 bytes read as cp1252 then saved as UTF-8
    fixed = text
    try:
        fixed = text.encode('cp1252', errors='replace').decode('utf-8', errors='replace')
    except:
        pass
    
    if fixed != text:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(fixed)
        print(f"FIXED: {f}")
    else:
        print(f"NO CHANGE: {f}")

print("\nDone. Run: npm run build")
