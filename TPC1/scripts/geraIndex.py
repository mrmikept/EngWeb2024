import os
import re
import geraRua as gR

os.chdir("../")
os.makedirs("htmlPages/ruas",exist_ok=True)

htmlHeader = '''
<!DOCTYPE html>
<html>
<head>
    <title>EngWeb2024_TPC1</title>
    <meta charset="UTF-8">
</head>
<body>
<h1>Ruas de Braga</h1>
<p><b>Selecione uma rua para ver os seus detalhes:</b></p>
'''

html = htmlHeader

files = os.listdir("dataset/texto")

regularE = r'MRB-\d+-(.+)\.xml' # Expressão Regular para extrair o nome das ruas

regularESpaces = r'(?<!^)(?=[A-Z])' # Expressão Regular para inserir espaços antes das letras maisculas, ignorando a primeira letra.

html += "<ul>"

listaRuas = []

for file in files:
    ruaSemEspacos = re.match(regularE,file).group(1)
    listaRuas.append(ruaSemEspacos); 
    gR.geraRua(file, ruaSemEspacos)


for rua in sorted(listaRuas):
    ruaComEspacos = re.sub(regularESpaces, " ", rua)
    html +=  f'<li><a href="ruas/{rua}.html">{ruaComEspacos}</a></li>'


html += "</ul>"
html += "</body>"
html += "</html>"

file = open("htmlPages/index.html", "w", encoding="utf-8")
file.write(html)
file.close()



