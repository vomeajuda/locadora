const express = require('express');
const router = express.Router();

const clientes = require('../controllers/crudClientes');
const paginas = require('../controllers/crudPaginas');
const login = require('../controllers/crudLogin');
const usuario = require('../controllers/crudUsuario');

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

router.get('/cadastro', paginas.listCadastro);

router.post('/clientes/addClientes', clientes.save);

router.post('/confLogin', login.logar);

router.post('/usuarios/addUsuario', usuario.save);



module.exports = router;