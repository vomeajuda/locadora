const express = require('express');
const router = express.Router();

const clientes = require('../controllers/crudClientes');
const paginas = require('../controllers/crudPaginas');
const login = require('../controllers/crudLogin');
const usuario = require('../controllers/crudUsuario');
const funcionarios = require('../controllers/crudFunc');

router.get('/', paginas.list);

router.get('/clientes', clientes.listClientes);

router.get('/buscacli', paginas.listBuscacli);

router.get('/buscafun', paginas.listBuscafun);

router.get('/buscaord', paginas.listBuscaord);

router.get('/buscavei', paginas.listBuscavei);

router.get('/elprimotors', paginas.listElprimotors);

router.get('/login', paginas.listLogin);

router.get('/ordemservico', paginas.listOrdemServico);

router.get('/veiculo', paginas.listVeiculo);

router.get('/cadastro', paginas.listCadastro);

router.post('/clientes/addClientes', clientes.save);

router.post('/confLogin', login.logar);

router.post('/usuarios/addUsuario', usuario.save);

router.get('/clientes/deleteClientes/:clienteCPF', clientes.delete);

router.get('/clientes/next', clientes.next);

router.get('/clientes/prev', clientes.prev);

router.post('/funcionario/addFunc', funcionarios.save);

router.get('/funcionario', funcionarios.listFuncionario);

router.get('/funcionario/deleteFunc/:funcMatricula', funcionarios.deleteFunc);

router.get('/funcionario/next', funcionarios.nextFunc);

router.get('/funcionario/prev', funcionarios.prevFunc);

module.exports = router;