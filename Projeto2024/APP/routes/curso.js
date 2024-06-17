var express = require("express");
var router = express.Router();
var axios = require("axios");
var path = require("path");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var Auth = require("../controllers/auth");
var API = require("../config/apiEnv");

router.get("/", Auth.verifyAcess, function (req, res, next) {
  axios
    .get(API.apiRoute("/curso?token=" + req.cookies.token))
    .then((resp) => {
      var cursos = resp.data;
      const message = req.session.message;
      delete req.session.message;
      req.session.redirectURL = '/curso'
      res
        .status(200)
        .render("listaCursos", { lCursos: cursos, message: message, userRole : req.userRole, userId : req.userID });
    })
    .catch((erro) => {
      res.status(501).render("error", { error: erro });
    });
});

router.get("/adicionar", Auth.verifyAcessProducer, function (req, res, next) {
  res.status(200).render("adicionarCurso");
});

router.post("/adicionar", Auth.verifyAcessProducer, function (req, res, next) {

  const uniqueId = uuidv4();

  req.body._id = uniqueId;
  req.body.idProdutor = req.userID
  req.body.listaRecursos = [];
  req.body.listaInscritos = [];

  var result = req.body;

  console.log(result);

  axios
    .post(API.apiRoute("/curso?token=" + req.cookies.token), result)
    .then((resp) => {
      req.session.message = "Curso criado com sucesso!";
      const redirect = req.session.redirectURL
      delete req.session.redirectURL
      res.status(200).redirect(redirect || "/curso");
    })
    .catch((erro) => {
      res.status(503).render("error", { error: erro });
    });
});

router.post("/edit/:id", Auth.verifyAcessProducer, function (req, res, next) {
  var curso = req.body;
  console.log(curso);

  axios
    .put(
      API.apiRoute("/curso/" + req.params.id + "?token=" + req.cookies.token),
      curso
    )
    .then((resp) => {
      req.session.message = "Recurso editado com sucesso!";
      res.redirect("/curso/" + req.params.id);
    })
    .catch((erro) => {
      res.status(503).render("error", { error: erro });
    });
});

router.get("/edit/:id", Auth.verifyAcessProducer, function (req, res, next) {
  axios
    .get(
      API.apiRoute("/curso/" + req.params.id + "?token=" + req.cookies.token)
    )
    .then((resp) => {
      curso = resp.data;
      axios
        .get(API.apiRoute("/recurso?token=" + req.cookies.token))
        .then((resp1) => {
          recursos = resp1.data;
          res
            .status(200)
            .render("editarCurso", { Curso: curso, Recursos: recursos });
        });
    })
    .catch((erro) => {
      res.status(502).render("error", { error: erro });
    });
});

router.get("/delete/:id", Auth.verifyAcessProducer, function (req, res, next) {
  axios.get(API.apiRoute("/recurso?token=" + req.cookies.token))
    .then(resp => {
      recursos = resp.data
      recursos.forEach(recurso => {
        if (recurso.cursoId == req.params.id) {
          let oldPath = path.join(__dirname, "/../public/fileStore/", recurso.filePath);

          fs.unlink(oldPath, (err) => {
            if (err) {
              console.error("Erro ao remover o arquivo antigo: ", err);
              return res.status(500).render("error", { error: err });
            } else {
              console.log("Ficheiro removido!");
            }
          })
        }
      });

      axios.delete(API.apiRoute("/curso/" + req.params.id + "?token=" + req.cookies.token))
        .then((resp1) => {
          console.log("Curso eliminado com sucesso!");
          req.session.message = "Curso eliminado com sucesso!";
          res.redirect("/curso");
        })
        .catch((erro) => {
          res.status(504).render("error", { error: erro });
        });
    })
});

router.post("/addFavourite/:id", Auth.verifyAcess, function (req, res) {
  let userID = req.userID;
  axios
    .post(
      API.apiRoute(
        `/users/${userID}/favoritos/curso?token=${req.cookies.token}`
      ),
      req.body
    )
    .then((result) => {
      if (result.status == 200) {
        res.status(200).jsonp("Sucesso");
      } else {
        res.status(500).jsonp("Erro");
      }
    })
    .catch((error) => {
      res.status(500).jsonp("Erro");
    });
});

router.post("/removeFavourite/:id", Auth.verifyAcess, function (req, res) {
  let userID = req.userID;
  axios
    .delete(
      API.apiRoute(
        `/users/${userID}/favoritos/curso?id=${req.body.id}&token=${req.cookies.token}`
      )
    )
    .then((result) => {
      if (result.status == 200) {
        res.status(200).jsonp("Sucesso");
      } else {
        res.status(500).jsonp("Erro");
      }
    })
    .catch((error) => {
      res.status(500).jsonp("Erro");
    });
});

router.get('/produtor', Auth.verifyAcessProducer, function(req, res) {
  axios.get(API.apiRoute('/curso/produtor/' + req.userID + '?token=' + req.cookies.token))
    .then(dados => {
      if (dados.status == 200)
      {
        const message = req.session.message
        delete req.session.message
        req.session.redirectURL = '/curso/produtor'
        res.status(200).render('listaCursos', { lCursos : dados.data, message : message})
      }
      else
      {
        res.status(505).render("error", { error: erro });
      }
    })
    .catch(erro => {
      res.status(504).render("error", { error: erro });
    })
})

router.get("/:id", Auth.verifyAcess, function (req, res, next) {
  axios
    .get(
      API.apiRoute("/curso/" + req.params.id + "?token=" + req.cookies.token)
    )
    .then((resp) => {
      var curso = resp.data;
      axios
        .get(API.apiRoute("/recurso?token=" + req.cookies.token))
        .then((respo) => {
          axios
            .get(
              API.apiRoute(
                `/users/${req.userID}/favoritos/curso?id=${curso._id}&token=${req.cookies.token}`
              )
            )
            .then((info) => {
              let isFav = info.data.isFav;
              var recursos = respo.data;
              const message = req.session.message;
              delete req.session.message;
              res.status(200).render("paginaCurso", {
                Curso: curso,
                Recursos: recursos,
                message: message,
                isFavorite: isFav,
                userRole: req.userRole
              });
            });
        });
    })
    .catch((erro) => {
      res.status(505).render("error", { error: erro });
    });
});

module.exports = router;
