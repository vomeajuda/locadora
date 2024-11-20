
exports.list = (req, res) => {
    res.render('login', {err: false});
};

exports.listBuscacli = (req, res) => {
    const dpto = req.query.dpto;
    if (dpto == 4){
        res.render('buscacli', {
            isSearch: false,
        });
    } else if (dpto == 5){
        res.render('buscacliCopa', {
            isSearch: false,
        });
    } else {return res.status(404).send("Not found")}
};

exports.listBuscafun = (req, res) => {
    const dpto = req.query.dpto;
    if (dpto == 4){
        res.render('buscafun', {
            isSearch: false,
        });
    } else if (dpto == 5){
        res.render('buscafunCopa', {
            isSearch: false,
        });
    } else {return res.status(404).send("Not found")}
};

exports.listBuscaord = (req, res) => {
    res.render('buscaord');
};

exports.listBuscavei = (req, res) => {
    const dpto = req.query.dpto;
    if (dpto == 4){
        res.render('buscavei', {
            isSearch: false,
        });
    } else if (dpto == 5){
        res.render('buscaveiCopa', {
            isSearch: false,
        });
    } else {return res.status(404).send("Not found")}
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

exports.listElprimotorsFinan = (req, res) => {
    res.render('elprimotorsFinan');
};

exports.listElprimotorsCopa = (req, res) => {
    res.render('elprimotorsCopa');
};

exports.listLogin = (req, res) => {
    res.render('login', {err: false});
};

exports.listCadastro = (req, res) => {
    res.render('cadastro');
}