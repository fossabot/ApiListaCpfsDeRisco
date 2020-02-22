'use strict';
const mongoose = require('mongoose');
const CpfModel = mongoose.model('CpfModel');
const cpfIsValid = require('../utils/cpfValid');
const repository = require('../repositories/cpf.repository');


exports.addCpf = ('/', async (req, res, next) => {

    let cpf = req.body.cpf;   

    if (!cpfIsValid(cpf)) {

        res.status(400).send({ type: "InvalidCpfException", message: "CPF is not valid." });
    } else {

        try {

            var data = await repository.findCpf(cpf);

            if(data){
                res.status(400).send({ type: "ExistsCpfException", message: "CPF already exists." });
            }else{

                await repository.addCpf(cpf);
                res.status(204).send();
            }            

        } catch (e) {
            res.status(500).send(e);
        }

    }

});

exports.checkCpf = ('/', async (req, res, next) => {

    const cpfParam = req.param('cpf');

    if (!cpfIsValid(cpfParam)) {

        res.status(400).send({ type: "InvalidCpfException", message: "CPF is not valid." });
    } else {

        try {
            var data = await repository.findCpf(cpfParam);

            if (!data) {
                res.status(200).send({ type: "NotFoundCpfException", message: "CPF not found" });
            } else {
                res.status(200).send(data);
            }

        } catch (e) {
            res.status(500).send(e);
        }
    }
});

exports.removeCpf = ('/', async(req, res, next) => {

    let cpfParam = req.param('cpf');   

    if (!cpfIsValid(cpfParam)) {

        res.status(400).send({ type: "InvalidCpfException", message: "CPF is not valid." });
    } else {

        try {

            var data = await repository.findCpf(cpfParam);            
            if(!data){

                res.status(200).send({ type: "NotFoundCpfException", message: "CPF not found" });
            }else{

                await repository.deleteCpf(cpfParam);
                res.status(204).send();
            }        

        } catch (e) {
            res.status(500).send(e);
        }
    }
});

exports.findAllCPFs = ('/', async(req, res, next) => {

    try{

        var data = await repository.allCpfs();
        res.status(200).send(data);
    }catch{
        res.status(500).send(e);       
    }

});
