'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cpf:{
        type: String,
        required: true,
        trim:true,
        index:true,
        unique: true
    },
    createdAt:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('CpfModel', schema);