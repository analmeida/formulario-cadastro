var AlunoService = require("../services/AlunoService")

function Aluno(){
    this._id = null
    this.nome = null
    this.email = null
    this.bday = null
    this.endereco = null
    this.cpf_cnpj = null
    this.person = null
}

Aluno.prototype.save = function(callback){
    //this neste contexto � o objeto aluno
    var aluno = this
    AlunoService.save(aluno, callback)
}

Aluno.prototype.delete = function(callback){
    //this neste contexto � o objeto aluno
    var aluno = this
    AlunoService.delete({"_id": aluno._id}, callback)
}

Aluno.list = function(callback){
    AlunoService.list(callback)
}

Aluno.find = function(search, callback){
    AlunoService.find(search, callback)
}

Aluno.findById = function(id, callback){
    AlunoService.findById(id, callback)
}

module.exports = Aluno;
