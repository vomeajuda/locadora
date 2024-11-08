const express = require('express');
const router = express.Router();

const clientes = require('../controllers/crudClientes');
const paginas = require('../controllers/crudPaginas');
const usuarios = require('../controllers/crudFunc');

router.get('/', paginas.list);

router.get('/clientes', paginas.listClientes);

router.get('/buscacli', paginas.listBuscacli);

router.get('/buscafun', paginas.listBuscafun);

router.get('/buscaord', paginas.listBuscaord);

router.get('/buscavei', paginas.listBuscavei);

router.get('/elprimotors', paginas.listElprimotors);

router.get('/funcionario', paginas.listFuncionario);

router.get('/login', paginas.listLogin);

router.get('/ordemservico', paginas.listOrdemServico);

router.get('/veiculo', paginas.listVeiculo);

router.post('/clientes/addClientes/:data', clientes.save);

router.get('/deleteClientes/:id', clientes.delete);

router.get('/updateClientes/:id', clientes.edit);

module.exports = router;