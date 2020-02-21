'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/cpf.controller');

router.post("/", controller.post);
router.get("/:cpf", controller.get);
router.delete("/:cpf", controller.delete);
router.get("/", controller.getAll);

module.exports = router;