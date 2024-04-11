var express = require('express')
var router = express.Router()
var modalidades = require('../controllers/modalidades')

/* GET lista de todas as modalidades */
router.get('/', function(req, res, next) {
    modalidades.listModalidades()
    .then(data => res.jsonp(data))
    .catch(e => {
        res.status(500)
        res.jsonp(e)
    })
})

router.get('/:idmodalidade', function(req, res, next) {
    modalidades.listAtletasModalidade(req.params.idmodalidade)
    .then(data => res.jsonp(data))
    .catch(e => {
        res.status(500)
        res.jsonp(e)
    })
})

module.exports = router