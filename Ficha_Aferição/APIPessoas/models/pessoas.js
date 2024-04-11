var mongoose = require('mongoose')

var pessoasSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    nome : String,
    idata : Number,
    sexo : String,
    morada : {
        type : Map,
        of : String
    },
    descrição : String,
    profissao : String,
    partido_politico : {
        type : Map,
        of : String
    },
    religiao : String,
    desportos : [String],
    animais : [String],
    figura_publica_pt : [String],
    marca_carro : String,
    destinos_favoritos : [String],
    atributos : {
        type : Map,
        of : mongoose.Schema.Types.Mixed
    }
}, {versionKey : false})

module.exports = mongoose.model('pessoas', pessoasSchema)