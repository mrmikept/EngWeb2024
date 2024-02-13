import os
import xml.etree.ElementTree as ET

htmlHeader = '''
<!DOCTYPE html>
<html>
<head>
    <title>Informação sobre uma Rua</title>
    <meta charset="UTF-8">
   <style>
      figure {
         display: block;
         margin: 0;
         padding: 0;
      }

      figcaption {
         font-size: 14px;
         margin-top: 10px;
         padding: 5px;
      }
   </style>

</head>
<body>
'''



nome = ""
numero = 0

listaImagens = []
listaCasas = []

def geraRua(ruaXML, filename):
    html = htmlHeader
    tree = ET.parse("dataset/texto/" + ruaXML)
    root = tree.getroot()
    nome = root.find('./meta/nome').text if not None else 'Nome não encontrado'
    
    html += f'<h1>{nome}</h1>' # Escreve o nome da Rua como titulo H1
    
    html += '<a href="../index.html">Voltar ao indice de ruas.</a>' # Voltar ao indice

    html += '<h2>Imagens:</h2>'
    fignumber = 1
    for figura in root.findall('.//figura'): # Processar as imagens 
        imagem = figura.find('imagem')
        legenda = figura.find('legenda').text if not None else "Legenda não encontrada."
        imag_Path = '../../dataset/imagem/' + os.path.basename(imagem.get('path'))
        html += f'<figure><img src={imag_Path} alt="Imagem" width="100%" height="auto"><figcaption><b>Figura {fignumber}:</b> {legenda}</figcaption></figure>'
        fignumber = fignumber + 1

    atualPath = "dataset/atual/"

    for imag in os.listdir(atualPath): # Processar as imagens atuais
        if nome.replace(" ", "") in imag:
            imagPath = "../../dataset/atual/" + imag
            if "Vista1" in imag:
                leg = f"{nome} atual - Vista 1"
                html += f'<figure><img src={imagPath} alt="Imagem Vista 1" width="50%" height="auto"><figcaption><b>Figura {fignumber}:</b> {leg}</figcaption></figure>'
                fignumber = fignumber + 1
            if "Vista2" in imag:
                leg = f"{nome} atual - Vista 2"
                html += f'<figure><img src={imagPath} alt="Imagem Vista 2" width="50%" height="auto"><figcaption><b>Figura {fignumber}:</b> {leg}</figcaption></figure>'
                fignumber = fignumber + 1
    

    html += '<h2>Descrição:</h2>'

    for elem in root.findall('./corpo/para'):
        parag = ""

        buff = elem.text.strip() if elem.text else "" # Para remover os espaços no inicio e no fim da string
        parag += buff

        for element in elem: # Processar os paragrafos
            
            parag += f' <b>{element.text}</b> ' if element.text else ""

            if element.tail:
                parag += element.tail.strip()
        
        html += f'<p>{parag}</p>'
    
    html += '<h2>Casas:</h2><dl>'

    for elem in root.findall('./corpo/lista-casas/casa'): # Processar a lista de casas
        elem_numero = elem.find('número').text if elem.find('número') is not None else "Número não encontrado"
        elem_enfiteuta = elem.find('enfiteuta').text if elem.find('enfiteuta') is not None else "Enfiteuta não encontrado"
        elem_foro = elem.find('foro').text if elem.find('foro') is not None else "Foro não encontrado"

        html += f'<dt> <b>Número da Casa:</b> {elem_numero}'
        html += f'<dd>- <b>Enfiteuta:</b> {elem_enfiteuta}</dd>'
        html += f'<dd>- <b>Foro:</b> {elem_foro}</dd>'

        if elem.find('desc'):
            html += '<dd>- <b> Descrição:</b> '
            for para in elem.find('desc'):
                parag = ""

                buff = para.text.strip() if para.text else ""
                parag += buff

                for element in para:

                    parag += f' <b>{element.text}</b> ' if element.text else ""
                    if element.tail:
                        parag += element.tail.strip()

                html += f'{parag}'

            html += '</dd>'
        
    
    html += '</dl>'
    html += '<a href="../index.html">Voltar ao indice de ruas.</a>' # Voltar ao indice
    html += "</body>"
    html += "</html>"

    file = open(f'htmlPages/ruas/{filename}.html','w', encoding='utf-8')
    file.write(html)
    file.close()
    
    


