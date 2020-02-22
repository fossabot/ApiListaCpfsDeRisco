const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

//conexão com o banco de dados
// mongoose.connect('mongodb+srv://cpf_admin:milhas_123@cluster0-zm3ya.azure.mongodb.net/ndstr');//,{ useNewUrlParser: true, useUnifiedTopology: true })


mongoose
  .connect('mongodb://mongo:27017', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

//Carrega as models
const CpfModel = require('./models/cpf.model');

//carregar as rotas
const indexRoute = require('./routes/index.route');
const cpfRoute = require('./routes/cpf.route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRoute);
app.use('/cpf', cpfRoute);

module.exports = app;