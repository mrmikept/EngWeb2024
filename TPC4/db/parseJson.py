import json

def parsePeriodos(jsonData):
    db = {}
    contador = 1
    
    for elem in jsonData["compositores"]:
        if "periodo" in elem: 
            if elem["periodo"] not in db.keys():
                db[elem["periodo"]] = {
                    "id": elem["periodo"],
                    "secInicio": "",
                    "secFim": "",
                    "compositores": [(elem["id"],elem["nome"])],
                }
            else:
                db[elem["periodo"]]["compositores"].append((elem["id"],elem["nome"]))
    
    return db

def parseCompositores(jsonData):
    l = []
    contador = 1
    for elem in jsonData["compositores"] and elem not in l:
        if "periodo" and "id" and "nome" and "dataNasc" and "dataObito" in elem:
            l.append(elem)
        else: continue
    return l
        

jsonFile = open("./compositores.json","r")
jsonData = json.load(jsonFile)
jsonFile.close()

compositoresList = parseCompositores(jsonData)
periodosDb = parsePeriodos(jsonData)


newDb = {
    "compositores": compositoresList,
    "periodos": list(periodosDb.values())
}

finalJson = open("compositoresFinal.json","w")
json.dump(newDb,finalJson,indent=2)
finalJson.close()


