var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET Pagina com a lista de pessoas. */
router.get('/', function(req, res, next) {
    axios.get("http://localhost:3000/pessoas")
    .then(resp => {
        pessoas = resp.data
        res.status(200).render("pessoasList", {'lpessoas' : pessoas})
    })
    .catch(erro => {
        res.status(500).render("infoPage", {"title" : "Erro", "message" : erro})
    })
});



// GET Página com as Informações de uma pessoa
router.get('/:id', function(req, res, next) {
    id = req.params.id
    axios.get('http://localhost:3000/pessoas/' + id)
    .then(data => {
        pessoa = data.data
        res.status(200).render('pessoaInfoPage', {'pessoa' : pessoa})
    })
    .catch(erro => {
        res.status(501).render('infoPage', {"title" : "Erro", "message": erro})
    })
})

// GET do delete de uma pessoa
router.get('/pessoas/delete/:id', function(req, res, next) {
    id = req.params.id
    axios.delete('http://localhost:3000/pessoas/' + id)
    .then(data => {
        res.status.render('infoPage', {"title" : "Sucesso", "mensagem" : "Pessoa apagada com sucesso!"})
    })
    .catch(erro => {
        res.status(501).render('infoPage', {"title" : "Erro", "message": erro})
    })
})

module.exports = router;