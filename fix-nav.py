import re

file = r'C:\dev\ddl-site\components\SiteNav.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

css_add = '.ddl-search-wrap { display: flex; align-items: center; gap: 8px; margin-left: 8px; flex-shrink: 0; }\n        .ddl-search-input { background: rgba(245,241,235,0.05); border: 1px solid rgba(245,241,235,0.08); border-radius: 6px; padding: 6px 12px; font-family: \'JetBrains Mono\', monospace; font-size: 11px; color: rgba(245,241,235,0.5); width: 160px; outline: none; transition: all 0.2s; }\n        .ddl-search-input::placeholder { color: rgba(245,241,235,0.25); }\n        .ddl-search-input:focus { border-color: rgba(245,241,235,0.2); color: #F5F1EB; background: rgba(245,241,235,0.07); width: 220px; }\n        .ddl-mob-btn { display: none;'
content = content.replace('.ddl-mob-btn { display: none;', css_add)

jsx_add = '{/* Search */}\n          <div className="ddl-search-wrap">\n            <input\n              className="ddl-search-input"\n              type="text"\n              placeholder="Search routes..."\n              onKeyDown={(e) => {\n                if (e.key === \'Enter\') {\n                  const q = (e.target as HTMLInputElement).value.trim();\n                  if (q) window.location.href = \'/search?q=\' + encodeURIComponent(q);\n                }\n              }}\n            />\n          </div>\n          {/* Mobile button */}'
content = content.replace('{/* Mobile button */}', jsx_add)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
