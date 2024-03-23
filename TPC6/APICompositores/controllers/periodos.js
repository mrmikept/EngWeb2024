var mongoose = require('mongoose')
var Periodo = require("../models/periodos")

module.exports.list = () => {
    return Periodo
        .find()
        .sort({_id: 1})
        .exec()
}

module.exports.insert = (periodo) => {
    var newPeriodo = new Periodo(periodo)
    return newPeriodo.save()
}

module.exports.update = (id, periodo) => {
    return Periodo
        .findByIdAndUpdate(id, periodo, {new : true})
        .exec()
}

module.exports.delete = (id) => {
    return Periodo
        .findByIdAndDelete(id)
        .exec()
}

module.exports.get = (id) => {
    return Periodo
        .find({_id: id}, {})
        .exec()
}