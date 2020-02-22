const mongoose = require('mongoose');
const CpfModel = require('../models/cpf.model');

exports.addCpf = async(cpf) =>{

    
    let createdAt = new Date();    
    var cpfModel = new CpfModel();

    cpfModel.cpf = cpf;
    cpfModel.createdAt = createdAt.toISOString();

    await cpfModel.save();

};

exports.findCpf = async(cpf) =>{

    return await CpfModel.findOne({cpf: cpf}, 'cpf createdAt');
}

exports.deleteCpf = async(cpf) =>{

    return await CpfModel.remove({ cpf: cpf });
}

exports.allCpfs = async() =>{

    return await CpfModel.find({}, 'cpf createdAt')
}