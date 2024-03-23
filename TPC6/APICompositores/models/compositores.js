var mongoose = require('mongoose')

var compositoresSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    nome : String,
    dataNasc : String,
    dataObito : String,
    bio : String,
    periodo : String
}, {versionKey : false})

module.exports = mongoose.model('compositores',compositoresSchema)