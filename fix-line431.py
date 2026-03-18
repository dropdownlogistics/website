file = r'C:\dev\ddl-site\components\SiteNav.tsx'
with open(file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and replace line 431 (index 430)
new_line = '          <div className="ddl-search-wrap" style={{display:"flex",alignItems:"center",marginLeft:"8px",flexShrink:0}}><input className="ddl-search-input" type="text" placeholder="Search..." style={{background:"rgba(245,241,235,0.05)",border:"1px solid rgba(245,241,235,0.08)",borderRadius:"6px",padding:"6px 12px",fontFamily:"JetBrains Mono,monospace",fontSize:"11px",color:"rgba(245,241,235,0.5)",width:"160px",outline:"none"}} onFocus={()=>{ window.dispatchEvent(new Event("ddl-open-search")); (document.activeElement as HTMLElement).blur(); }} readOnly /></div>\n'

lines[430] = new_line

with open(file, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('Done')
print('Line 431 now:', lines[430][:80])
