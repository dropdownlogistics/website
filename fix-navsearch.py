file = r'C:\dev\ddl-site\components\SiteNav.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

old = 'onKeyDown={(e)=>{if(e.key==="Enter"){const q=(e.target as HTMLInputElement).value.trim();if(q)window.location.href="/search?q="+encodeURIComponent(q);}}} />'
new = 'onFocus={()=>{ window.dispatchEvent(new Event("ddl-open-search")); (document.activeElement as HTMLElement).blur(); }} readOnly placeholder="Search..." />'

content = content.replace(old, new)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
