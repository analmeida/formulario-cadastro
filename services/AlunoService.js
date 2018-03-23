var MongoConnection = require('../common/mongoConnection')

function AlunoService(){

}

AlunoService.save = function(aluno, callback){
    var mongoConnection = new MongoConnection().open(function(err, db){
        if (aluno._id != null && aluno._id != "") {
            aluno._id = MongoConnection.getObjectID(aluno._id) //converte o _id em ObjectId
            db.collection('alunos').updateOne({"_id": aluno._id}, aluno, function (err, result) {
                console.log(err)
                callback(err, result)
                db.close()
            })
        }else{
            delete aluno._id //remove o _id para não inserir no documento um valor null
            db.collection('alunos').insertOne(aluno, function (err, result) {
                aluno._id = result.insertedId
                callback(err, result)
                db.close()
            })
        }
    })
}

AlunoService.list = function(callback){
    var mongoConnection = new MongoConnection().open(function(err, db){
        db.collection('alunos').find({}).toArray(function(err, result){
            callback(err, result)
            db.close()
        })
    })
}

AlunoService.delete = function(aluno, callback){
    var objectId = MongoConnection.getObjectID(aluno._id)
    var mongoConnection = new MongoConnection().open(function(err, db){
        db.collection('alunos').deleteOne({_id: objectId}, function(err, result){
            callback(err,result)
            db.close()
        })
    })
}

AlunoService.find = function(search, callback){
    var mongoConnection = new MongoConnection().open(function(err, db){
        db.collection('alunos').find(search).toArray(function(err, result){
            callback(err, result)
            db.close()
        })
    })
}

AlunoService.findById = function(id, callback){

    var objectId = MongoConnection.getObjectID(id)
    var mongoConnection = new MongoConnection().open(function(err, db){
        db.collection('alunos').find({_id: objectId}).toArray(function(err, result){
            callback(err, result)
            db.close()
        })
    })
}

module.exports = AlunoService