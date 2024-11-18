const express = require('express');
const router = express.Router();

const clientes = require('../controllers/crudClientes');
const paginas = require('../controllers/crudPaginas');
const login = require('../controllers/crudLogin');
const usuario = require('../controllers/crudUsuario');
const funcionarios = require('../controllers/crudFunc');
const veiculos = require('../controllers/crudVeic');

router.get('/', paginas.list);

router.get('/buscacli', paginas.listBuscacli);

router.get('/buscafun', paginas.listBuscafun);

router.get('/buscaord', paginas.listBuscaord);

router.get('/buscavei', paginas.listBuscavei);

router.get('/elprimotors', paginas.listElprimotors);

router.get('/elprimotorsAtend', paginas.listElprimotorsAtend);

router.get('/elprimotorsAdm', paginas.listElprimotorsAdm);

router.get('/elprimotorsFinan', paginas.listElprimotorsFinan);

router.get('/elprimotorsCopa', paginas.listElprimotorsCopa);

router.get('/login', paginas.listLogin);

router.get('/ordemservico', paginas.listOrdemServico);

router.get('/cadastro', paginas.listCadastro);

router.post('/confLogin', login.logar);

router.post('/usuarios/addUsuario', usuario.save);


router.get('/clientes', clientes.listClientes);

router.post('/clientes/addClientes', clientes.save);

router.get('/clientes/deleteClientes', clientes.delete);

router.get('/clientes/next', clientes.next);

router.get('/clientes/prev', clientes.prev);

router.get('/clientes/editClientes', clientes.edit);

router.post('/clientes/updateClientes', clientes.update);

router.get("/clientes/buscacli", clientes.busca);


router.post('/funcionario/addFunc', funcionarios.save);

router.get('/funcionario', funcionarios.listFuncionario);

router.get('/funcionario/deleteFunc', funcionarios.deleteFunc);

router.get('/funcionario/next', funcionarios.nextFunc);

router.get('/funcionario/prev', funcionarios.prevFunc);

router.get('/funcionario/editFunc', funcionarios.editFunc);

router.post('/funcionario/updateFunc', funcionarios.updateFunc);

router.get("/funcionario/buscafun", funcionarios.buscaFunc);


router.post('/veiculo/addVeiculo', veiculos.saveVeic);

router.get('/veiculo', veiculos.listVeic);

router.get('/veiculo/deleteVeic/:veicPlaca', veiculos.deleteVeic);

router.get('/veiculo/next', veiculos.nextVeic);

router.get('/veiculo/prev', veiculos.prevVeic);

router.get('/veiculo/editVeiculo/:veicPlaca', veiculos.editVeic);

router.post('/veiculo/updateVeiculo', veiculos.updateVeic);



module.exports = router;