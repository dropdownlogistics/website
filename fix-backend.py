file = r'C:\dev\ddl-site\app\backend\page.jsx'
with open(file, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('stat={321800}', 'stat="500K+"')
content = content.replace('ChromaDB / 321,800 chunks', 'ChromaDB / 500K+ chunks')
with open(file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
