var express = require('express')
var router = express.Router()
var pessoas = require('../controllers/pessoas')

/* GET lista de todas as pessoas */
router.get('/', function(req, res, next) {
    pessoas.list()
    .then(data => res.jsonp(data))
    .catch(e => {
        res.status(500)
        res.jsonp(e)
    })
})

// Post Pessoas
router.post('/', function(req, res, next) {
    pessoas.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(e => {
        res.status(500) // Status code 500 caso dê algum erro!
        res.jsonp(e)
    })
})

router.get('/:id', function(req, res, next) {
    pessoas.get(req.params.id)
           .then(data => res.jsonp(data))
           .catch(e => {
            res.status(500)
            res.jsonp(e)})
})

// Delete Pessoas
router.delete('/:id', function(req, res, next) {
    pessoas.delete(req.params.id)
    .then(data => res.jsonp(data))
    .catch(e => {
        res.status(500)
        res.jsonp(e)
    })
})

// PUT Pessoas
router.put('/:id', function(req, res, next) {
    pessoas.update(req.params.id, req.body)
           .then(data => res.jsonp(data))
           .catch(e => {
            res.status(500)
            res.jsonp(e)
        })
})

module.exports = router