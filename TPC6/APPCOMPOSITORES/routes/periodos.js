var express = require("express");
var router = express.Router();
var axios = require("axios");

router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:3000/periodos")
    .then((resp) => {
      lPeriodos = resp.data;
      res.status(200).render("periodosListPage", { lPeriodos: lPeriodos });
    })
    .catch((erro) => {
      res.status(507).render("infoPage", { title: "Erro", message: erro });
    });
});

// Lista de Periodos
router.get("/periodos", function (req, res, next) {
  axios
    .get("http://localhost:3000/periodos")
    .then((resp) => {
      lPeriodos = resp.data;
      res.status(200).render("periodosListPage", { lPeriodos: lPeriodos });
    })
    .catch((erro) => {
      res.status(508).render("infoPage", { title: "Erro", message: erro });
    });
});

// Registo de um Periodo

router.get("/registo", function (req, res, next) {
    res.status(200).render("periodoFormPage")
})

router.post("/registo", function(req, res, next) {
  result = req.body
  axios.post("http://localhost:3000/periodos", result)
  .then(resp => {
    res.status(201).render("infoPage", {"title" : "Sucesso", "message" : "Periodo Registado com sucesso."})
  })
  .catch(erro => {
    res.status(510).render("infoPage", { title: "Erro", message: erro });
  })
})

// Editar um Periodo

router.get("/edit/:idPeriodo", function(req, res, next) {
  id = req.params.idPeriodo
  axios.get("http://localhost:3000/periodos/" + id)
  .then(resp => {
    periodo = resp.data
    res.status(200).render("periodoEditFormPage", {"periodo" : periodo})
  })
  .catch(erro => {
    res.status(511).render("infoPage", { "title": "Erro", "message": erro });
  })
})

router.post("/edit/:idPeriodo", function(req, res, next) {
  var periodo = req.body
  axios.put("http://localhost:3000/periodos/" + periodo._id, periodo)
  .then(resp => {
    res.status(201).render("infoPage", {"title" : "Sucesso", "message" : "Periodo editado com sucesso!"})
  })
  .catch(erro => {
    res.status(512).render("infoPage", { "title": "Erro", "message": erro });
  })
})

// Delete de um Periodo

router.get("/delete/:idPeriodo", function(req, res, next) {
  id = req.params.idPeriodo
  axios.delete("http://localhost:3000/periodos/" + id)
  .then(resp => {
    res.status(200).render("infoPage", {"title" : "Sucesso", "message" : "Periodo eliminado com sucesso!"})
  })
  .catch(erro => {
    res.status(513).render("infoPage", {"title" : "Erro", "message" : erro})
  })
})


// Página de detalhes de um Periodo
router.get("/:idPeriodo", function (req, res, next) {
  id = req.params.idPeriodo;
  axios
    .get("http://localhost:3000/periodos/" + id)
    .then((resp) => {
      periodo = resp.data;
      console.log(periodo)
      res.status(200).render("periodoPage", { periodo: periodo });
    })
    .catch((erro) => {
      res.status(508).render("infoPage", { title: "Erro", message: erro });
    });
});

module.exports = router;
