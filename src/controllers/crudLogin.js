const bcrypt = require('bcrypt');

const controller = {};

controller.logar = (req, res) => {
    const { usuarioLogin, usuarioSenha } = req.body;

    const query = 'SELECT * FROM usuarios WHERE usuarioLogin = ? AND usuarioSenha = ?';

    // Executa a consulta com usuarioLogin e usuarioSenha como parâmetros
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }
        conn.query(query, [usuarioLogin, usuarioSenha], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao buscar o login');
        }
        if (result.length > 0) {
            const usuarioSetor = result[0].usuarioSetor;
            if (usuarioSetor === 1){
                res.redirect('/elprimotorsAtend');
            } else if (usuarioSetor === 2){
                res.redirect('/elprimotorsAdm');
            } else if (usuarioSetor === 3){
                res.redirect('/elprimotorsFinan');
            } else if (usuarioSetor === 4){
                res.redirect('/elprimotors');
            } else if (usuarioSetor === 5){
                res.redirect('/elprimotorsCopa');
            } else {
                res.redirect('/login', {err: false});
            }
        } else {
            return res.render('login', {err: true})
        }
    });
});  
};

module.exports = controller;