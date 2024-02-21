var http = require('http')
var url = require('url')
var axios = require('axios')
const { log } = require('console')

http.createServer((req, res) => {
    log(req.method + " " + req.url)

    var q = url.parse(req.url, true)

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})

    if(q.pathname == "/")
    {
        res.write("<h1>Escola de Música</h1>")
        res.write("<h3>Escolha uma das seguintes opções de navegação:</h3>")
        res.write("<ul>")
        res.write("<li><a href='/cursos'>Lista de cursos</a></li>")
        res.write("<li><a href='/instrumentos'>Lista de instrumentos</a></li>")
        res.write("<li><a href='/alunos'>Lista de alunos</a></li>")
        res.write("</ul>")
        res.end()
    }
    else if(q.pathname == "/cursos") // Página lista de cursos
    {
        axios.get("http://localhost:3000/cursos?_sort=designacao")
        .then((resp) => {
            var data = resp.data

            res.write("<h1>Escola de Música</h1>")
            res.write("<h3>Lista de cursos disponíveis:</h3>")
            res.write("<ul>")
            for(i in data)
            {
                res.write("<li><a href='/cursos/" + data[i].id + "'>" + data[i].designacao + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h4><a href='/'>Voltar à página principal</a></h4>")
            res.end()
        })
        .catch((erro) => {
            log("Erro: " + erro)
            res.write("<h1>Erro</h1><p>" + erro + "</p>")
            res.end()
        })
    }
    else if(q.pathname == "/alunos") // Página lista de alunos
    {
        axios.get("http://localhost:3000/alunos?_sort=nome")
        .then((resp) => {
            var data = resp.data

            res.write("<h1>Escola de Música</h1>")
            res.write("<h3>Lista de Alunos:</h3>")
            res.write("<ul>")
            for(i in data)
            {
                res.write("<li><a href='/alunos/" + data[i].id + "'>" + data[i].nome + "</a></li>")
            }
            res.write("</ul>")
            res.write("<h4><a href='/'>Voltar à página principal</a></h4>")
            res.end()
        })
        .catch((erro) => {
            log("Erro: " + erro)
            res.write("<h1>Erro</h1><p>" + erro + "</p>")
            res.end()
        })
    }
    else if(q.pathname == "/instrumentos") // Página lista de instrumentos
    {
        axios.get("http://localhost:3000/instrumentos?_sort=%23text") // TODO sort disto 
        .then((resp) => {
            var data = resp.data

            res.write("<h1>Escola de Música</h1>")
            res.write("<h3>Lista de instrumentos:</h3>")
            res.write("<ul>")
            for(i in data)
            {
                res.write("<li>" + data[i]["#text"] + "</li>")
            }
            res.write("</ul>")
            res.write("<h4><a href='/'>Voltar à página principal</a></h4>")
            res.end()
        })
        .catch((erro) => {
            log("Erro: " + erro)
            res.write("<h1>Erro</h1><p>" + erro + "</p>")
            res.end()
        })
    }
    else if (q.pathname.startsWith("/cursos/C")) // Página detalhes de um curso
    {
        let id = req.url.split("/").pop()
        axios.get("http://localhost:3000/cursos/" + id)
        .then((resp) => {
            var data = resp.data

            res.write("<h1>Escola de Música</h1>")
            res.write("<h2>" + data.designacao + "</h2>")
            res.write("<p><b>Id: </b>" + data.id + "</p>")
            res.write("<p><b>Duração: </b>" + data.duracao + "</p>")
            res.write("<p><b>Instrumento: </b>" + data.instrumento["#text"] + "</p>")
            res.write("<h4><a href='/cursos'>Voltar à lista de cursos</a></h4>")
            res.write("<h4><a href='/'>Voltar à página principal</a></h4>")
            res.end()
        })
        .catch((erro) => {
            log("Erro: " + erro)
            res.write("<h1>Erro: Curso não encontrado</h1><p>" + erro + "</p>")
            res.end()
        })
    }
    else if (q.pathname.startsWith("/alunos/A"))
    {
        let id = req.url.split("/").pop()
        axios.get("http://localhost:3000/alunos/" + id)
        .then((resp) => {
            var data = resp.data
            res.write("<h1>Escola de Música</h1>") 
            res.write("<h2>Ficha de Aluno</h2>")
            res.write("<p><b>Id: </b>" + data.id + "</p>")
            res.write("<p><b>Nome: </b>" + data.nome + "</p>")
            res.write("<p><b>Data Nascimento: </b>" + data.dataNasc + "</p>")
            res.write("<p><b>Curso: </b><a href='/cursos/" + data.curso + "'>" + data.curso + "</a>")
            res.write("<p><b>Ano do Curso: </b>" + data.anoCurso + "</p>")
            res.write("<p><b>Instrumento: </b>" + data.instrumento + "</p>")
            res.write("<h4><a href='/alunos'>Voltar à lista de alunos</a></h4>")
            res.write("<h4><a href='/'>Voltar à página principal</a></h4>")
            res.end()
        })
        .catch((erro) => {
            log("Erro: " + erro)
            res.write("<h1>Erro: Aluno não encontrado</h1><p>" + erro + "</p>")
            res.end()
        })
    }
    else
    {
        res.write("<h1>Error 404</h1><p>Page not Found!</p>")
        res.end()
    }

}).listen(2024)

log("Servidor à escuta na porta 2024")