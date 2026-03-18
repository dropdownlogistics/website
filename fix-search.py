file = r'C:\dev\ddl-site\components\SiteNav.tsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

old = '<button className="ddl-mob-btn" onClick={() => setMobileOpen(!mobileOpen)}'
new = '<div className="ddl-search-wrap" style={{display:"flex",alignItems:"center",marginLeft:"8px",flexShrink:0}}><input className="ddl-search-input" type="text" placeholder="Search..." style={{background:"rgba(245,241,235,0.05)",border:"1px solid rgba(245,241,235,0.08)",borderRadius:"6px",padding:"6px 12px",fontFamily:"JetBrains Mono,monospace",fontSize:"11px",color:"rgba(245,241,235,0.5)",width:"160px",outline:"none"}} onKeyDown={(e)=>{if(e.key==="Enter"){const q=(e.target as HTMLInputElement).value.trim();if(q)window.location.href="/search?q="+encodeURIComponent(q);}}} /></div>\n          <button className="ddl-mob-btn" onClick={() => setMobileOpen(!mobileOpen)}'

content = content.replace(old, new)

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
