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
            res.redirect('/elprimotors');
        } else {
            return res.status(401).send('Erro de retorno');
        }
    });
        });

  
     
};

module.exports = controller;
