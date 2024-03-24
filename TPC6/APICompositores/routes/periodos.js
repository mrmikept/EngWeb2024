var express = require('express')
var router = express.Router()
var periodo = require('../controllers/periodos')

/* GET Periodos */
router.get('/', function(req, res, next) {
    periodo.list()
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// Post Periodos
router.post('/', function(req, res, next) {
    periodo.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// Delete Periodos
router.delete('/:id', function(req, res, next) {
    periodo.delete(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// PUT Periodos
router.put('/:id', function(req, res, next) {
    periodo.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// Get Periodos
router.get('/:id', function(req, res, next) {
    periodo.get(req.params.id)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

module.exports = router;