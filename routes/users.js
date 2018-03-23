var async = require("async")
var express = require('express');
var router = express.Router();
var Aluno = require('../domain/aluno');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/alterar', function(req, res, next) {

    function done(result) {
        res.send(result)
    }
    async.waterfall([

        function(next) {
            var aluno = new Aluno()
            aluno.nome = req.query.nome
            aluno.save(function(err, result){
                next(err, result)
            })
        },
        function(result, next) {
            var aluno = new Aluno()
            aluno.nome = "leandro"
            aluno.save(function(err, result){
                next(err, result)
            })
        },
        function(result, next) {
            var aluno = Aluno.find({nome: "marlon"},function(err, result){
                next(err, result)
            })
        },
        function(result, next){
            next(result)
        }
    ], done);
});

module.exports = router;
