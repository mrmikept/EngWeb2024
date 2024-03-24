# TPC6 - API REST sobre compositores e Web App para gestão de compositores e periodos músicais

## Autor

**Nome:** Mike Pinto

**ID:** A89292

## Enunciado TP6

**Data:** 2024-03-18

**Resumo:** Desenvolver uma API de Dados REST para obter/modificar informação sobre compositores e periodos músicais presentes numa Base de Dados em `MongoDB`. Desenvolver uma web app, utilizando a framework `Express.js` e `PUG.js`, para a gestão de compositores e periodos músicais recorrendo a operações `CRUD` sobre os mesmos.

## Resolução

### API de Dados

Para está fase, foi dividido o dataset utilizado nos TPC's anteriores, sobre os compositores músicais, em dois ficheiros `JSON`, `compositores.json` e `periodos.json`. De modo a estes datasets serem reconhecidos e lidos pelo `MongoDB` bastou alterar o compo `id` para `_id`.

A API de Dados desenvolvida encontra-se na pasta `APICompoitores`. Para a conexão com o `MongoDB` utilizou-se a biblioteca `mongoose`.

Foram então definidos os `models` e `controllers` para os periodos e compositores músicais e as respetivas rotas.

#### Compositores

**Operações implementadas:**
- `.list` -> Lista completa de compositores músicais, ordenados alfabeticamente por nome.
- `.insert` -> Insere um novo compositor.
- `.update` -> Atualiza os dados de um compositor.
- `.delete` -> Apaga um determinado compositor.
- `.get` -> Devolve a informação de um determinado compositor.

**Rotas definidas:**
- GET `/compositores` -> Operação GET sobre a Lista de Compositores.
- POST `/compositores` -> Operação POST sobre a Lista de Compositores.
- DELETE `/compositores/:id` -> Operação DELETE de um Compositor.
- PUT `/compositores/:id` -> Operação PUT sobre um Compositor.
- GET `/compositores/:id` -> Operação GET sobre um Compositor.

#### Periodos


**Operações implementadas:**
- `.list` -> Lista completa de periodos músicais, ordenados alfabeticamente por _id.
- `.insert` -> Insere um novo periodos.
- `.update` -> Atualiza os dados de um periodo.
- `.delete` -> Apaga um determinado periodo.
- `.get` -> Devolve a informação de um determinado periodo.

**Rotas definidas:**
- GET `/periodos` -> Operação GET sobre a Lista de periodos.
- POST `/periodos` -> Operação POST sobre a Lista de periodos.
- DELETE `/periodos/:id` -> Operação DELETE de um Periodo.
- PUT `/periodos/:id` -> Operação PUT sobre um Periodo.
- GET `/periodos/:id` -> Operação GET sobre um Periodo.


### APP gestão de Compositores e Periodos

Para esta fase, recorreu-se à Web App desenvolvida no [TPC5](https://github.com/mrmikept/EngWeb2024/tree/main/TPC5), bastando alterar algumas das suas rotas em operações `CRUD`.

## Ferramentas e recursos necessários

Para a resolução deste TPC foi utilizado:
- Docker
- MongoDB
- Node.js
- Axios
- Express.js
- Pug.js
- mongoose
- Stylesheet dísponivel no site da [w3school](https://www.w3schools.com/).