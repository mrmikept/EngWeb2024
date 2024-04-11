var pessoas = require('../models/pessoas')

module.exports.listModalidades = () => {
    return pessoas
        .aggregate([{ $unwind: "$desportos" }, { $group: { _id: "$desportos" } }, {$sort : {_id: 1}}, { $group : { _id : "desportos", lista : { $push : "$_id"}} }])
        .exec()
}

module.exports.listAtletasModalidade = (id) => {
    return pessoas
        .aggregate([
            { $match : 
                { 
                    desportos : 
                    { 
                        $in: [id] 
                    } 
                } 
            },
            {
                $sort : 
                { 
                    nome : 1
                }
            },
            {
                $group : 
                {
                        _id : id,
                        lista : { $push : "$nome" } 
                }
            }
        ])
        .exec()
}   