import re, html
xml = open('/home/z/my-project/upload/docx-extract/word/document.xml','r',encoding='utf-8').read()
paras = re.split(r'</w:p>', xml)
lines = []
for p in paras:
    texts = re.findall(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', p)
    if texts:
        line = html.unescape(''.join(texts))
        lines.append(line)
    elif '<w:p' in p:
        lines.append('')
out = '\n'.join(lines)
open('/home/z/my-project/upload/program-guide.txt','w').write(out)
print(f'lines: {len(lines)}, words: {len(out.split())}, chars: {len(out)}')
