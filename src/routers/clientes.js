const express = require('express');
const router = express.Router();

const crud = require('../controllers/crudClientes');

router.post('/add', crud.save);

router.get('/delete/:id', crud.delete);

router.get('/update/:id', crud.edit);

module.exports = router;