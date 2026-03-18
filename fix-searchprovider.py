file = r'C:\dev\ddl-site\components\SearchProvider.jsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

old = "if ((e.metaKey || e.ctrlKey) && e.key === 'k') {"
new = "if ((e.metaKey || e.ctrlKey) && e.key === 'k' || e.type === 'ddl-open-search') {"

content = content.replace(old, new)

old2 = "window.addEventListener('keydown', handler);\n    return () => window.removeEventListener('keydown', handler);"
new2 = "window.addEventListener('keydown', handler);\n    window.addEventListener('ddl-open-search', handler);\n    return () => { window.removeEventListener('keydown', handler); window.removeEventListener('ddl-open-search', handler); };"

content = content.replace(old2, new2)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
