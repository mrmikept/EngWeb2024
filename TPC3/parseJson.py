import json

def parseJson(file_path, filename):
    try:
        with open(file_path, "r") as json_file:
            json_content = json_file.read()
            
        newJson = '{ "filmes" : ['
        
        lines = json_content.splitlines()
        for line in lines:
            newJson += f'{line},'
        
        newJson = newJson.removesuffix(",")
        newJson += "]}"
         
        f = open(filename,"w")
        f.write(newJson)
        f.close
         
    except FileNotFoundError:
        print(f'O ficheiro: {file_path} não foi encontrado.')
    except Exception as e:
        print(f'Ocorreu um erro: {e}')

def fixId(jsondata):
    for elem in jsondata["filmes"]:
        elem['id'] = elem["_id"]["$oid"]
        del elem['_id']
    jFile = open('./parsedFilmes.json',"w")
    json.dump(jsondata,jFile,indent=4)

def parseGenres(jsondata):
    db = {}
    contador = 1
    
    for elem in jsondata["filmes"]:
        if "genres" in elem.keys():
            for gen in elem["genres"]:
                if gen not in db.keys():
                    db[gen] = {"id": f'g{contador}',
                               "nome": gen,
                               "filmes" : {elem["id"] : elem["title"]}
                              }
                    contador += 1
                else:
                    d = db[gen]["filmes"].update({elem["id"] : elem["title"]})
                    
    return db


def parseActors(jsondata):
    db = {}
    contador = 1
    
    for elem in jsondata["filmes"]:
        if "cast" in elem.keys():
            for actor in elem["cast"]:
                if actor not in db.keys():
                    db[actor] = {
                        "id": f'a{contador}',
                        "nome": actor,
                        "filmes" : {elem["id"] : elem["title"]}
                    }
                    contador += 1
                else:
                    db[actor]["filmes"].update({elem["id"] : elem["title"]})
                    
    return db

def parseFilms(jsondata, actorsdb, genresdb):
    list = []
    
    for elem in jsondata["filmes"]:
        
        item = {}
        item["id"] = elem['id']
        item["title"] = elem['title']
        item["year"] = elem['year']
                
        if "cast" in elem.keys() and len(elem['cast']) > 0:            
            castId = {}
            for castm in elem['cast']:
                castId.update({actorsdb[castm]["id"] : actorsdb[castm]["nome"]})
            item["cast"] = castId
        
        if "genres" in elem.keys() and len(elem['genres']) > 0:
            genreId = {}
            for genrem in elem["genres"]:
                genreId.update({genresdb[genrem]["id"] : genresdb[genrem]["nome"]})
            item["genres"] = genreId
          
        list.append(item)
    
    return list


file_path = './filmes.json'
filename = 'parsedFilmes.json'

parseJson(file_path,filename)

file = open(filename)
data = json.load(file)

fixId(data)

genresDb = parseGenres(data)
actorsDb = parseActors(data)
filmsDb = parseFilms(data, actorsDb, genresDb)

final = {
    "filmes": filmsDb,
    "generos": list(genresDb.values()),
    "atores": list(actorsDb.values())
}

finalJson = open('filmesFinal.json',"w")
json.dump(final,finalJson,indent=4)
finalJson.close()
    