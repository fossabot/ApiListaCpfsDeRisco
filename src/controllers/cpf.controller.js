'use strict';

const mongoose = require('mongoose');
const CpfModel = mongoose.model('CpfModel');
const cpfValid = require('../utils/cpfValid');
//Add Cpf
exports.post = ('/', (req, res, next) => {

    let cpf = req.body.cpf;
    let createdAt = new Date();

    //OK - Adicionar o cpf e data de inclusão(createdAt - ISO 8601 -UTC.) na base

    //TODO - Validar se o cpf é valido, se não retornar InvalidCpfException".
    if(!cpfValid(cpf)){

        res.status(400).send({ type: "InvalidCpfException", message: "CPF is not valid."});
        
    }else{

        var cpfModel = new CpfModel();

        cpfModel.cpf = cpf;
        cpfModel.createdAt = createdAt.toISOString();
    
        cpfModel
            .save()
            .then(data => {
                res.status(204).send();
            })
            .catch(error => {
                res.status(400).send(error);
            })
    }

    //TODO - Se o cpf já existir na base deve retornar ExistsCpfException".

    


});

//Check CPF
exports.get = ('/', (req, res, next) => {

   
    //OK - Se um CPF existir deve retornar o CPF e a data de criação (createdAt) no formato ISO 8601 - UTC.
    //OK - Se o CPF não existir deve retornar uma exceção do tipo "NotFoundCpfException".
    //TODO - Se o CPF for inválido deve retornar a exceção do tipo "InvalidCpfException".

    const cpfParam = req.param('cpf');

    if(!cpfValid(cpfParam)){

        res.status(400).send({ type: "InvalidCpfException", message: "CPF is not valid."});
    }

    CpfModel
        .findOne({cpf: cpfParam}, 'cpf createdAt')
        .then(data => {
            if(!data){
                res.status(200).send("NotFoundCpfException");
            }else{
                res.status(200).send(data);
            }            
        })
        .catch(error => {
            res.status(200).send(error);
        });

});

//Remove CPF
exports.delete = ('/', (req, res, next) => {

    let cpfParam = req.param('cpf');

    //OK - remover o cpf da base
    //TODO - Se o CPF não existir deve retornar uma exceção do tipo "NotFoundCpfException".
    //TODO - Se o CPF for inválido deve retornar a exceção do tipo "InvalidCpfException".

    if(!cpfValid(cpfParam)){

        res.status(400).send({ type: "InvalidCpfException", message: "CPF is not valid."});
    }

    CpfModel
        .remove({ cpf: cpfParam })
        .then(data => {
            res.status(204).send();
        })
        .catch(error => {
            res.status(400).send(error)
        });


});


//Find All CPFs
exports.getAll = ('/', (req, res, next) => {

    //OK - 1. Se nenhum CPF existir na lista deve retornar um array vazio.

    CpfModel
        .find({}, 'cpf createdAt')
        .then(data => {
            res.status(200).send(data);
        })
        .catch({

        });

});
