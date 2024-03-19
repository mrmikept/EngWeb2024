var http = require('http')
var axios = require('axios')
const { parse } = require('querystring')

var static = require('./static.js')
var templates = require('./templates.js')

// Aux function to parse form data
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server Creation

var compositoresServer = http.createServer((req, res) => {
    console.log(req.method + " " + req.url)

    if(static.isStaticResource(req)) // Handle static Resources
    {
        static.serverStaticResources(req, res)
    }
    else
    {
        switch(req.method)
        {
            case "GET":
                // GET /compositores
                if(req.url == '/compositores' || req.url == '/')
                {
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                    .then(resp => {
                        compList = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.compositoresListPage(compList))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(501, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível obter a Lista de Compositores.\n' + erro))
                        res.end()
                    }) 
                }
                // GET /compositores/:id
                else if(/^(\/compositores)\/(.+?)$/.test(req.url))
                {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/compositores/" + id)
                    .then(resp => {
                        comp = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.compositorPage(comp))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(502, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível obter a informação do compositor.\n' + erro))
                        res.end()
                    }) 
                }
                // GET /edit/compositores/:id
                else if(/^(\/edit)\/compositores\/(C\d+)$/.test(req.url))
                {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/compositores/" + id)
                    .then(resp => {
                        comp = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.compositorEditFormPage(comp))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível obter a informação do compositor.\n' + erro))
                        res.end()
                    }) 
                }
                // GET /delete/compositores/:id
                else if(/^(\/delete)\/compositores\/(C\d+)$/.test(req.url))
                {
                    id = req.url.split("/").pop()
                    axios.delete("http://localhost:3000/compositores/" + id)
                    .then(resp => {
                        res.writeHead(200, {'Content-Type' : 'text/html'})
                        res.write(templates.infoPage("Sucesso","Compositor " + id + " apagado com sucesso!"))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(504, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível eliminar a informação do compositor.\n' + erro))
                        res.end()
                    }) 
                }
                // GET /compositores/registo
                else if(req.url == "/registo/compositores")
                {
                    axios.get("http://localhost:3000/periodos")
                    .then(resp => {
                        periodos = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.compositorFormPage(periodos))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(520, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Algo de errado não está certo!\n' + erro))
                        res.end()
                    })
                }
                // GET /periodos
                else if(req.url == "/periodos")
                {
                    axios.get("http://localhost:3000/periodos?_sort=designacao")
                    .then(resp => {
                        periodosList = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.periodosListPage(periodosList))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível obter a Lista de Periodos!\n' + erro))
                        res.end()
                    }) 
                }
                // GET /periodos/registo
                else if(req.url == '/registo/periodos')
                {
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(templates.periodoFormPage())
                    res.end()
                }
                // GET /periodos/:id
                else if(/^(\/periodos)\/(.+?)$/.test(req.url))
                {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/periodos/" + id)
                    .then(resp => {
                        periodo = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.periodoPage(periodo))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(506, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível obter a informação do periodo.\n' + erro))
                        res.end()
                    }) 
                }
                // GET /edit/periodos/:id
                else if(/^(\/edit)\/periodos\/(.+?)$/)
                {
                    id = req.url.split("/").pop()
                    axios.get("http://localhost:3000/periodos/" + id)
                    .then(resp => {
                        periodo = resp.data
                        res.writeHead({'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.periodoEditFormPage(periodo))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(507, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível obter a informação do periodo.\n' + erro))
                        res.end()
                    }) 
                }
                // GET /delete/periodos/:id
                else if(/^(\/delete)\/periodos\/(.+?)$/)
                {
                    id = req.url.split("/").pop()
                    axios.delete("http://localhost:3000/periodos/" + id)
                    .then(resp => {

                    })
                    .catch(erro => {
                        res.writeHead(508, {'Content-Type' : 'text/html; charset=utf-8'})
                        res.write(templates.infoPage('Erro','Não foi possível obter a informação do periodo.\n' + erro))
                        res.end()
                    }) 
                }
                // Error when GET method is not recognized
                else
                {
                    res.writeHead(509, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(templates.infoPage('Erro','Get Request não suportado:' + req.url))
                    res.end()
                }
                break
            case "POST":
                // POST /registo/compositores
                if(req.url == '/registo/compositores')
                {
                    collectRequestBodyData(req, result => {
                        if(result)
                        {
                            console.log(result)
                            console.log(result.periodo)
                            axios.post("http://localhost:3000/compositores", result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.infoPage("Sucesso","Compositor registado com sucesso!"))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(510, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.infoPage('Erro','Não foi possível registar o Compositor!\n' + erro))
                                res.end()
                            })
                        }
                        else
                        {
                            res.writeHead(511, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.infoPage('Erro','Não foi possível obter as informações do formulário'))
                            res.end()
                        }
                    })
                }
                // POST /registos/periodos
                else if(req.url == '/registo/periodos')
                {
                    collectRequestBodyData(req, result => {
                        if(result)
                        {
                            console.log(result)
                            axios.post("http://localhost:3000/periodos", result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.infoPage("Sucesso","Periodo registado com sucesso!"))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(510, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.infoPage("Erro","Não foi possivel registar o periodo..."))
                                res.end()
                            })
                        }
                        else
                        {
                            res.writeHead(511, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.infoPage('Erro','Não foi possível obter as informações do formulário'))
                            res.end()
                        }
                    })
                }
                // POST /edit/periodos/:id
                else if(/^(\/edit)\/periodos\/(p\d+?)$/.test(req.url))
                {
                    collectRequestBodyData(req, result => {
                        if(result)
                        {
                            console.log(result)
                            axios.put("http://localhost:3000/periodos/" + result.id, result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.infoPage("Sucesso","Periodo editado com sucesso!"))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(512, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.infoPage("Erro","Não foi possivel editar o periodo... " + erro))
                                res.end()
                            }) 
                        }
                        else
                        {
                            res.writeHead(513, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.infoPage('Erro','Não foi possível obter as informações do formulário'))
                            res.end()
                        }
                    })
                }
                // POST /edit/compositores/:id
                else if(/^(\/edit)\/compositores\/(.+?)$/.test(req.url))
                {
                    collectRequestBodyData(req, result => {
                        if(result)
                        {
                            console.log(result)
                            axios.put("http://localhost:3000/compositores/" + result.id, result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.infoPage("Sucesso","Compositor editado com sucesso!"))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(514, {'Content-Type' : 'text/html; charset=utf-8'})
                                res.write(templates.errorPage("Não foi possivel editar o compositor... " + erro))
                                res.end()
                            }) 
                        }
                        else
                        {
                            res.writeHead(515, {'Content-Type' : 'text/html; charset=utf-8'})
                            res.write(templates.infoPage('Erro','Não foi possível obter as informações do formulário'))
                            res.end()
                        }
                    })
                }
                // Error when POST method is not recognized
                else
                {
                    res.writeHead(516, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write(templates.infoPage('Erro','POST Request não suportado:' + req.url))
                    res.end()
                }
                break
            default:
                // Unsuported methods
                res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
                res.write(templates.infoPage('Erro','Método ' + req.method + " não suportado!"))
                res.end()
                break
        }
    }
})

compositoresServer.listen(7777, () => {
    console.log("Servidor de compositores à escuta na porta 7777...")
})