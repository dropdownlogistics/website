"""
Deploy JSX files fresh from source. Run from repo root.
Usage: python deploy-jsx.py
"""
import os
import shutil

src_dir = os.path.expanduser(r"~\OneDrive\99_DexUniverseArchive\Dex_iOS\DDL Website\not-deployed-jsx")

deploys = {
    "console-sonic-thread.jsx": r"app\analytics\sonic-thread\page.jsx",
    "console-callback-engine.jsx": r"app\analytics\callback-engine\page.jsx",
    "console-catnip-map.jsx": r"app\analytics\catnip-map\page.jsx",
    "console-dimensional-map.jsx": r"app\analytics\dimensional-map\page.jsx",
    "social-hub.jsx": r"app\social\page.jsx",
}

for src_name, dest_path in deploys.items():
    src = os.path.join(src_dir, src_name)
    if not os.path.exists(src):
        print(f"SKIP (source missing): {src_name}")
        continue

    # Ensure directory exists
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)

    # Read source as raw bytes
    with open(src, 'rb') as f:
        raw = f.read()

    # Strip any BOM
    for bom in [b'\xef\xbb\xbf', b'\xff\xfe', b'\xfe\xff']:
        if raw.startswith(bom):
            raw = raw[len(bom):]

    # Try to decode as UTF-8 first, fall back to cp1252
    try:
        text = raw.decode('utf-8')
    except UnicodeDecodeError:
        text = raw.decode('cp1252')

    # Prepend 'use client' if not already there
    if not text.strip().startswith("'use client'"):
        text = "'use client';\n" + text

    # Write clean UTF-8 without BOM
    with open(dest_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)

    print(f"DEPLOYED: {src_name} -> {dest_path}")

print("\nDone. Run: npm run build")
