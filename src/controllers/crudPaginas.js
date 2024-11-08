const controller = {};

exports.list = (req, res) => {
    res.render('elprimotors');
};

exports.listBuscacli = (req, res) => {
    res.render('buscacli');
};

exports.listBuscafun = (req, res) => {
    res.render('buscafun');
};

exports.listBuscaord = (req, res) => {
    res.render('buscaord');
};

exports.listBuscavei = (req, res) => {
    res.render('buscavei');
};

exports.listElprimotors = (req, res) => {
    res.render('elprimotors');
};

exports.listFuncionario = (req, res) => {
    res.render('funcionario');
};

exports.listLogin = (req, res) => {
    res.render('login');
};

exports.listOrdemServico = (req, res) => {
    res.render('ordemservico');
}

exports.listVeiculo = (req, res) => {
    res.render('veiculo');
}