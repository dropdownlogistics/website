"""
patch-sitemap.py
Run: python patch-sitemap.py C:/dev/ddl-site/app/sitemap/page.jsx
"""
import sys

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else None
    if not path:
        print("Usage: python patch-sitemap.py <path>")
        return

    with open(path, "r", encoding="utf-8") as f:
        src = f.read()

    original = src

    # 1. Expand CanonPress
    src = src.replace(
        "  {\n    label: 'CanonPress', color: C.crimson, routes: [\n      { href: '/canonpress', label: 'CanonPress Hub' },\n    ],\n  },",
        "  {\n    label: 'CanonPress', color: C.crimson, routes: [\n      { href: '/canonpress', label: 'CanonPress Hub' },\n      { href: '/canonpress/converge', label: 'Converge' },\n      { href: '/canonpress/converge/schedule', label: 'Converge \u2014 Schedule' },\n      { href: '/canonpress/converge/tuning-log', label: 'Converge \u2014 Tuning Log' },\n      { href: '/canonpress/redline', label: 'RedLine' },\n      { href: '/canonpress/deepcut', label: 'DeepCut' },\n      { href: '/canonpress/groundtruth', label: 'GroundTruth' },\n      { href: '/canonpress/groundtruth/gt-001', label: 'GT-001 \u2014 Watching the System Run' },\n      { href: '/canonpress/groundtruth/gt-002', label: 'GT-002 \u2014 The Outfit Doesn\u2019t Kill the Idea' },\n    ],\n  },"
    )

    # 2. Add The Bench wing before About
    src = src.replace(
        "  {\n    label: 'About', color: C.crimson, routes: [",
        "  {\n    label: 'The Bench', color: '#4A7C9B', routes: [\n      { href: '/bench', label: 'The Bench \u2014 Landing' },\n      { href: '/bench/onenote', label: 'OneNote' },\n      { href: '/bench/excel', label: 'Excel' },\n      { href: '/bench/word', label: 'Word' },\n      { href: '/bench/visio', label: 'Visio' },\n      { href: '/bench/cmd', label: 'CMD' },\n      { href: '/bench/powershell', label: 'PowerShell' },\n      { href: '/bench/adobe', label: 'Acrobat' },\n    ],\n  },\n  {\n    label: 'About', color: C.crimson, routes: ["
    )

    # 3. Fix footer mojibake (literal bytes as they appear)
    src = src.replace(
        "Chaos \u00e2\u2020\u2019 Structured \u00e2\u2020\u2019 Automated",
        "Chaos \u2192 Structured \u2192 Automated"
    )
    src = src.replace(
        "Chaos â†' Structured â†' Automated",
        "Chaos \u2192 Structured \u2192 Automated"
    )

    if src == original:
        print("WARNING: No changes made.")
    else:
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        print("Done.")

if __name__ == "__main__":
    main()
