var express = require('express')
var router = express.Router()
var compositor = require('../controllers/compositores')

/* GET Compositores */
router.get('/', function(req, res, next) {
    compositor.list()
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// Post Compositores
router.post('/', function(req, res, next) {
    compositor.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// Delete Compositores
router.delete('/:id', function(req, res, next) {
    compositor.delete(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// PUT Compositores
router.put('/:id', function(req, res, next) {
    compositor.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

// Get Compositores
router.get('/:id', function(req, res, next) {
    compositor.get(req.params.id)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
})

module.exports = router;