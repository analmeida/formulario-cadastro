var express = require('express');
var Aluno = require('../domain/aluno');
var router = express.Router();
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });

});

router.post('/alterar', function(req, res, next){

    console.log(req.body.id)

    Aluno.findById(req.body.id, function(err, result){
        if (err) {
            res.send({mensagem: "ERROR", aluno: null })
        }else{
            res.send({mensagem: "OK", aluno: result[0] })
        }
    })
})

router.post('/excluir', function(req, res, next){

    var aluno = new Aluno()
    aluno._id = req.body.id

    aluno.delete(function(err, result){
        if (err) {
            res.send({mensagem: "ERROR", aluno: null })
        }else{
            res.send({mensagem: "OK", aluno: result[0] })
        }
    })
})

router.post('/salvar', function(req, res, next){
    var aluno = new Aluno()
    aluno.nome = req.body.nome
    aluno.bday = req.body.bday
    aluno.email = req.body.email
    aluno.endereco = req.body.endereco
    aluno.cpf_cnpj = req.body.cpf_cnpj
    aluno.person = req.body.person
    aluno._id = req.body.id

    aluno.save(function(err, result){
        if (err) {
            res.send({mensagem: "ERROR", aluno: aluno})
        }else{
            res.send({mensagem: "OK", aluno: aluno})
        }
    })
})

router.get('/listar/:id', function(req, res, next){
    console.log(req.params.id)
    var alunosAux = [];
        Aluno.list(function(err, alunos){
        if(req.params.id !== 'null_undefined'){
           alunosAux = _.filter(alunos, function(value) {
                if(value.nome.indexOf(req.params.id) > -1){
                    return value;
                }
            });
        }else if(req.params.id == 'null_undefined' || req.params.id == undefined || req.params.id == null || req.params.id == ''){
            alunosAux=alunos;
        }
        res.render('listar', { title: 'Express', alunos: alunosAux});
    })
})


module.exports = router;
