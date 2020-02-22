'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cpf.controller');

router.post("/", controller.addCpf);
router.get("/:cpf", controller.checkCpf);
router.delete("/:cpf", controller.removeCpf);
router.get("/", controller.findAllCPFs);

module.exports = router;