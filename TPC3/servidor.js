var http = require('http')
var url = require('url')
var axios = require('axios')
var htmlPages = require('./templates')
var fs = require('fs')

const { log } = require('console')


http.createServer((req,res) => {
    log(req.method + " " + req.url)

    if(req.url == '/')
    {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
        res.write(htmlPages.indexListPage())
        res.end()
    }
    else if (req.url == '/filmes') // Lista de filmes
    {
        axios.get("http://localhost:3000/filmes?_sort=title")
        .then(resp => {
            filmes = resp.data
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write(htmlPages.filmsList(filmes))
            res.end()
        })
        .catch(erro => {
            res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<p>Não foi possivel obter a lista de filmes: " + erro + "</p>")
            res.end()
        })
    }
    else if (/\/filmes\/[a-z0-9]+$/.test(req.url)) //Página de detalhes de um filme
    {
        id = req.url.split('/')[2]
        axios.get("http://localhost:3000/filmes?id=" + id)
        .then(resp => {
            filme = resp.data[0]
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write(htmlPages.filmPage(filme))
            res.end()
        })
        .catch(erro => {
            res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<p>Não foi possivel obter o filme solicitado: " + erro + "</p>")
            res.end()
        })
    }
    else if (req.url == '/atores') // Lista de Atores
    {
        axios.get("http://localhost:3000/atores?_sort=nome")
        .then(resp => {
            actors = resp.data
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write(htmlPages.actorList(actors))
            res.end()
        })
        .catch(erro => {
            res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<p>Não foi possivel obter a lista de atores: " + erro + "</p>")
            res.end()
        })
    }
    else if(/\/atores\/a[0-9]+$/.test(req.url)) // Página do Ator
    {
        id = req.url.split("/")[2]
        axios.get("http://localhost:3000/atores?id=" + id)
        .then(resp => {
            actor = resp.data[0]
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write(htmlPages.actorPage(actor))
            res.end()
        })
        .catch(erro => {
            res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<p>Não foi possivel obter a lista de atores: " + erro + "</p>")
            res.end()
        })
    }
    else if (req.url == '/generos') // Lista de Generos
    {
        axios.get("http://localhost:3000/generos?_sort=nome")
        .then(resp => {
            genres = resp.data
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write(htmlPages.genreList(genres))
            res.end()
        })
        .catch(erro => {
            res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<p>Não foi possivel obter a lista de generos: " + erro + "</p>")
            res.end()
        })
    }
    else if (/\/generos\/g[0-9]+$/.test(req.url))
    {
        id = req.url.split('/')[2]
        axios.get("http://localhost:3000/generos?id=" + id)
        .then(resp => {
            genre = resp.data[0]
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write(htmlPages.genrePage(genre))
            res.end()
        })
        .catch(erro => {
            res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
            res.write("<p>Não foi possivel obter a lista de generos: " + erro + "</p>")
            res.end()
        })
    }
    else if (/(w3.css)$/.test(req.url)) // Stylesheet
    {
        fs.readFile("w3.css", (erro, dados) => {
            res.writeHead(200, {'Content-Type' : 'text/css'})
            res.write(dados)
            res.end()
        })
    }
    else 
    {
        res.writeHead(400, {'Content-Type' : 'text/html; charset=utf-8'})
        res.write("<h1>Erro</h1>")
        res.write("<p><b>Erro:</b> Pedido não suportado.</p>")
        res.write("<pre>" + req.url + "</pre>")
        res.end()
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777")