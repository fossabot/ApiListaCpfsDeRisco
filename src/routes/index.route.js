//onde fica a rota principal
'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

    res.status(200).send({
        title: "API para controle de CPFs com risco de fraude",
        version: "0.0.2"
    });

});

module.exports = router;

