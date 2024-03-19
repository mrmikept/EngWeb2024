var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET compositores listing. */

router.get('/', function(req, res, next) {
  axios.get("http://localhost:3000/compositores?_sort=nome")
  .then(resp => {
    comp = resp.data
    res.status(200).render("compositoresListPage", {"lComp" : comp})
  })
  .catch(erro => {
    res.status(501).render("infoPage", {"title": "Erro", "message" : erro})
  })
})

// Lista de Compositores
router.get('/compositores', function(req, res, next) {
  axios.get("http://localhost:3000/compositores?_sort=nome")
  .then(resp => {
    comp = resp.data
    res.status(200).render("compositoresListPage", {"lComp" : comp})
  })
  .catch(erro => {
    res.status(501).render("infoPage", {"title": "Erro", "message" : erro})
  })
});


// GET Página de Registo
router.get('/registo', function(req, res, next) {
  axios.get("http://localhost:3000/periodos?_sort=id")
  .then(resp => {
    lperiodo = resp.data
    res.status(200).render("compositorFormPage", {"lperiodo" : lperiodo})
  })
  .catch(erro => {
    res.status(503).render("infoPage", {"title" : "Erro", "message" : erro})
  })
});

// POST dados de um registo
router.post('/registo', function(req, res, next) {
  result = req.body
  axios.post("http://localhost:3000/compositores", result)
  .then(resp => {
    res.status(201).render("infoPage", {"title" : "Sucesso", "message" : "Compositor registado com sucesso!"})
  })
  .catch(erro => {
    res.status(509).render("infoPage", { title: "Erro", message: erro });
  })
})

// GET Página de edição de um compositor
router.get('/edit/:idCompositor', function(req, res, next) {
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/" + id)
  .then(resp => {
    comp = resp.data
    res.status(200).render('compositorEditFormPage', {'comp' : comp})
  })
  .catch(erro => {
    res.status(504).render("infoPage", {"title" : "Erro", "message" : erro})
  })
})

// PUT dos dados editados de um compositor
router.post('/edit/:idCompositor', function(req, res, next) {
  var comp = req.body
  axios.put("http://localhost:3000/compositores/" + comp.id, comp)
  .then(resp => {
    res.status(201).render("infoPage", {"title" : "Sucesso", "message" : "Compositor editado com sucesso!"})
  })
  .catch(erro => {
    res.status(505).render("infoPage", {"title" : "Erro", "message" : erro})
  })
})

// DELETE de um Compositor
router.get('/delete/:idCompositor', function(req, res, next) {
  var id = req.params.idCompositor
  axios.delete("http://localhost:3000/compositores/" + id)
  .then(resp => {
    res.status(200).render("infoPage", {"title" : "Sucesso", "message" : "Compositor eliminado com sucesso!"})
  })
  .catch(erro => {
    res.status(506).render("infoPage", {"title" : "Erro", "message" : erro})
  })
})

module.exports = router;

// Página de Compositor
router.get('/:idCompositor', function(req, res, next) {
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/" + id)
  .then(resp => {
    comp = resp.data
    res.status(200).render("compositorPage", {"comp" : comp})
  })
  .catch(erro => {
    res.status(502).render("infoPage", {"title": "Erro", "message" : erro})
  })
});