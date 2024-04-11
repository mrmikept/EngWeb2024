var pessoas = require('../models/pessoas')

module.exports.list = () => {
    return pessoas
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.insert = (pessoa) => {
    var newPessoa = new pessoas(pessoa)
    return newPessoa.save()
}

module.exports.update = (id, pessoa) => {
    return pessoas
        .findByIdAndUpdate(id, pessoa, {new : true})
        .exec()
}

module.exports.delete = (id) => {
    return pessoas
        .findByIdAndDelete(id)
        .exec()
}

module.exports.get = (id) => {
    return pessoas
        .findOne({_id : id}, {})
        .exec()
}