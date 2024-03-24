var mongoose = require('mongoose')
var compositores = require("../models/compositores")

module.exports.list = () => {
    return compositores
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.insert = (compositor) => {
    var newCompositor = new compositores(compositor)
    return newCompositor.save()
}

module.exports.update = (id, compositor) => {
    return compositores
        .findByIdAndUpdate(id, compositor, {new : true})
        .exec()
}

module.exports.delete = (id) => {
    return compositores
        .findByIdAndDelete(id)
        .exec()
}

module.exports.get = (id) => {
    return compositores
        .findOne({_id: id},{})
        .exec()
}