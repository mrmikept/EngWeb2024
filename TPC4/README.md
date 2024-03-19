# TPC4 - Compositores Músicais

## Autor

**Nome:** Mike Pinto

**ID:** A89292

## Enunciado TPC4

**Data:** 2024-03-04

**Resumo:** Montar uma API de dados, com recurso a `JSON-Server` e desenvolver uma página em `Node.js` com informação de um dataset sobre compositores músicais, onde cada compositor é composto por um `id`, `nome`, `bio`, `data Nascimento`, `data Obito` e `Periodo`.

A página web deverá conter índices com `lista de compositores` e `lista de periodos`. Deverá ainda possuir uma página sobre `detalhes de um compositor`, `detalhes de um periodo` e suportar operações `CRUD` sobre compositores e sobre periodos musicais.

## Realização

### Formatação do Dataset

Para a realização deste TPC, inicialmente foi desenvolvido um script em `python`, `parseJson.py`, com o objetivo de examinar o dataset fornecido, removendo entradas incompletas ou duplicadas, e criar uma lista com os periodos dísponiveis no dataset com referencia a todos os compositores deste periodo.

### API de Dados e Servidor Node.js

Foi desenvolvido um serviço em `Node.js` para suporte de toda a infraestrutura da aplicação, dísponivel no ficheiro `servidor.js` e `static.js` onde consta todas as operações de partilha de assets. As páginas em `HTML` desenvolvidas estão dísponiveis no ficheiro `templates.js` e recorrem ao ficheiro `w3.css` pertencente à pasta de assets `public`. 

As Rotas definidas foram:

`/` ou `/compositores` -> Lista de Compositores.
`/compositores/{id}` -> Página de detalhes de um compositor.
`/edit/compositores/{id}` -> Página de edição de um compositor.
`/registo/compositores` -> Página de registo de um compositor.

`/periodos` -> Lista de Periodos.
`/periodos/{id}` -> Página de detalhes de um periodo músical.
`/edit/periodos/{id}` -> Página de edição de um compositor.
`/registo/periodos` -> Página de registo de um periodo.

## Ferramentas e recursos necessários

Para a resolução deste TPC foi utilizado:
- JSON-Server
- Node.js
- Axios
- Python
- Stylesheet dísponivel no site da [w3school](https://www.w3schools.com/).