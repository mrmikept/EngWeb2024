import json
import requests

postUrl = 'http://localhost:3000/pessoas'
totalEntries = 0
datasets = [
    'dataset-extra1.json',
    'dataset-extra2.json',
    'dataset-extra3.json'
]

print(f'Making requests to: {postUrl}')

for dataset in datasets:
    print(f'Opening file: {dataset}')
    
    try:
        with open(f'../datasets/{dataset}', "r") as file:
            fileData = file.read()
    except FileNotFoundError:
        print(f'File "{dataset}" not found. Ignoring file...')
        continue
    except Exception:
        print(f'Something went wrong reading File "{dataset}". Ignoring file.')
        continue
    
    print('Reading Json data.')
    jsonData = json.loads(fileData)
    
    totalEntries += len(jsonData["pessoas"])
    
    print(f'Found {len(jsonData["pessoas"])} entries of "pessoas".')
    
    print('Initiating POST requests...')
    
    codes = {}
    try:
        for pessoa in jsonData["pessoas"]:

            # ler o valor da chave 'CC' ou 'BI' para a variavel id e remover essa entrada
            if 'CC' in pessoa.keys():
                id = pessoa['CC']
                pessoa.pop('CC')
            elif 'BI' in pessoa.keys():
                id = pessoa['BI']
                pessoa.pop('BI')

            # Caso alguma entrada não possua 'CC' ou 'BI' é ignorada
            if not id:
                print('CC or BI value not found in entry:')
                print(pessoa)
                print('\n Ignoring entry...')
                continue
            
            # Adicionar o '_id' necessário para o Mongo
            pessoa['_id'] = id

            # Verificar o código de sucesso
            sucess = requests.post(postUrl, 
                                   headers = {"Content-Type": "application/json"},
                                   json= pessoa)
            if sucess.status_code not in codes.keys():
                codes[sucess.status_code] = 1
            else:
                codes[sucess.status_code] += 1
    
        
         
        print(f'Finished POST requests!')
        for code in codes.keys():
            print(f'Status Code {code}: {codes[code]} entries.')

        print()   
    except KeyboardInterrupt:
        print('Process finished by user.')
        break