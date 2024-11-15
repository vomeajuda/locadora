const controller = {};

exports.list = (req, res) => {
    res.render('login');
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


exports.listLogin = (req, res) => {
    res.render('login');
};

exports.listOrdemServico = (req, res) => {
    res.render('ordemservico');
}

exports.listCadastro = (req, res) => {
    res.render('cadastro');
}