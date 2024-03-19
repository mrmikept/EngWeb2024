# TPC3 - Filmes Americanos

## Autor

**Nome:** Mike Pinto

**ID:** A89292

## Enunciado TPC3

**Data:** 2024-02-26

**Resumo:** Desenvolver uma página web em `Node.js` com informação de um dataset sobre filmes americanos, onde cada filme é composto por um `id`, `título`, `ano de lançamento`, `gêneros` e `elenco`.

A página web deverá conter índices com `lista de filmes`, `lista de atores` e `lista de gêneros`. Deverá ainda possuir uma página sobre `detalhes de um filme` com ligações para as páginas dos atores/atrizes que constituem o elenco e ligações para as páginas dos gêneros. Deverá ainda possuir detalhes de um ator/atriz com relação aos filmes que participou e detalhes sobre um gênero com relação aos filmes desse gênero.

## Realização

Para a realização deste TPC, foi necessário alterar o dataset em formato `JSON`, removendo estruturas aninhadas e criando dicionários para os `atores` e `gêneros` dos filmes, bem como a criação de índices para os mesmos. Para isto, foi desenvolvido um script em Python chamado `parseJson.py`.

Após a formatação do dataset, desenvolveu-se um serviço em `Node.js` e as páginas `HTML` suportadas pelo serviço, disponíveis nos ficheiros `servidor.js` e `template.js`.

As páginas `HTML` que compõem o serviço estão presentes nas funções disponíveis no ficheiro `template.js`:

- `indexListPaga` -> Página inicial do serviço, com links para as páginas de `Lista de Filmes`, `Lista de Atores` e `Lista de Gêneros`.

- `filmsList` -> Página com a lista de filmes disponível no dataset, ordenados alfabeticamente por título do filme, com link para a página inicial.

- `genreList` -> Página com a lista de gêneros disponível no dataset, ordenados alfabeticamente, com link para a página inicial.

- `actorList` -> Página com a lista de atores disponível no dataset, ordenados alfabeticamente por nome, com link para a página inicial.

- `filmPage` -> Página com os detalhes de um filme, composto pelo seu título, ano de lançamento, lista de atores e lista de gêneros, com links para as páginas correspondentes.

- `genrePage` -> Página com os detalhes do gênero de um filme, composto pela designação do gênero e uma lista de filmes desse gênero, com links para as páginas correspondentes.

- `actorPage` -> Página com os detalhes de um ator/atriz, composto pelo seu nome e uma lista de filmes em que participou, com links para as páginas correspondentes.

## Serviço Node.js e Páginas

- `'/'` -> Página principal com opção de navegar para as páginas de Lista de Filmes, Lista de Atores e Lista de Gêneros.

- `'/filmes'` -> Página com a Lista de Filmes disponível no dataset, ordenados alfabeticamente por título do filme.

- `'/atores'` -> Página com a Lista de Atores disponível no dataset, ordenados alfabeticamente por nome.

- `'/generos'` -> Página com a Lista de Gêneros disponível no dataset, ordenados alfabeticamente por nome do gênero.

- `'/filmes/{idFilme}'` -> Página de Detalhes de um filme, onde constam o título, ano, lista de gêneros desse filme e lista de atores que participaram no filme. Todos os gêneros e atores presentes na página possuem hiperligação para as respetivas páginas.

- `'/atores/aX'` -> Página de Detalhes do Ator com id `aX`, onde consta o seu nome e lista de filmes em que participou, com link para as páginas correspondentes.

- `'/generos/gX'` -> Página de Detalhes do Gênero com id `gX`, onde consta a sua designação e lista de filmes desse gênero, com links para as páginas correspondentes.

## Ferramentas e recursos necessários

Para a resolução deste TPC foi utilizado:
- JSON-Server
- Node.js
- Axios
- Python
- Stylesheet dísponivel no site da [w3school](https://www.w3schools.com/).