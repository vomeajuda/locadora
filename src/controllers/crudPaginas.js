const controller = {};

exports.list = (req, res) => {
    res.render('login');
};

exports.listBuscacli = (req, res) => {
    res.render('buscacli', {
        isSearch: false,
    });
};

exports.listBuscafun = (req, res) => {
    res.render('buscafun', {
        isSearch: false,
    });
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

exports.listElprimotorsAtend = (req, res) => {
    res.render('elprimotorsAtend');
};

exports.listElprimotorsAdm = (req, res) => {
    res.render('elprimotorsAdm');
};

exports.listElprimotorsFinanc = (req, res) => {
    res.render('elprimotorsFinanc');
};

exports.listElprimotorsCopa = (req, res) => {
    res.render('elprimotorsCopa');
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