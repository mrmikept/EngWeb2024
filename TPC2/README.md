# TPC2: Página web Escola de Música com recurso a json-server e node.js

## Autor

**Nome:** Mike Pinto

**Id:** A89292

## Enunciado TP2

**Data:** 2024-02-20

**Resumo:** Desenvolver uma página web em `node.js` com informação de um dataset de uma escola de música, composto por alunos, cursos e instrumentos a funcionar sobre `json-server`.

A Página web deverá conter indices com `lista de alunos`, `lista de instrumentos` e `lista de cursos`. Deverá ainda possuir uma página sobre `detalhes de um aluno` e `detalhes de um curso`

## Serviço Node.js e páginas

- '/' : Página Principal com opção de navegar para as páginas de lista de alunos, cursos e instrumentos.

- '/cursos' : Página da `lista de cursos` disponivel no dataset `ordenados alfabeticamente` por designação do curso.

- '/cursos/CX' : Página com o `detalhe do curso CX` onde consta o `id`, `duração` e `instrumento` do curso.

- '/alunos' : Página da `lista de alunos` presentes no dataset `ordenados alfabeticamente` por nome.

- '/alunos/AX' : Página de `detalhes do aluno AX` onde consta o `id`, `nome`, `data de nascimento`, `curso`(com hiperligação para a página do curso), `ano do curso` e `instrumento`.

- '/instrumentos' : Página da `lista de instrumentos` ordenados alfabeticamente por nome ('#text' do dataset).

