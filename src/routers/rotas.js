const express = require('express');
const router = express.Router();

const clientes = require('../controllers/crudClientes');


router.post('/add/:data', clientes.save);

router.get('/delete/:id', clientes.delete);

router.get('/update/:id', clientes.edit);

const funcionarios = require('../controllers/crudFunc')

router.post('/add/:data', funcionarios.save);

router.get('/delete/:id', funcionarios.delete);

router.get('/update/:id', funcionarios.edit);

module.exports = {
    router,
    clientes,
    funcionarios
  };