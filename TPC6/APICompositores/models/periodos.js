var mongoose = require('mongoose')

var periodosSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    secInicio : String,
    secFim : String,
    compositores : {
        type : Array
    }
}, { versionKey : false})

module.exports = mongoose.model('periodos', periodosSchema)