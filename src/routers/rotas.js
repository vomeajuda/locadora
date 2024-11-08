const express = require('express');
const router = express.Router();

const clientes = require('../controllers/crudClientes');
const paginas = require('../controllers/crudPaginas');

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

router.post('/clientes/addClientes', clientes.save);

router.delete('/clientes/deleteClientes', clientes.delete);

router.patch('/clientes/updateClientes', clientes.edit);

module.exports = router;