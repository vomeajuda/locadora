const express = require('express');
const router = express.Router();

const clientes = require('../controllers/crudClientes');

router.post('/add/:data', clientes.save);

router.get('/delete/:id', clientes.delete);

router.get('/update/:id', clientes.edit);

module.exports = router;