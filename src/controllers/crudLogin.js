const bcrypt = require('bcrypt');

const controller = {};

controller.logar = (req, res) => {
    const { usuarioLogin, usuarioSenha } = req.body;

    const query = 'SELECT * FROM usuarios WHERE usuarioLogin = ? AND usuarioSenha = ?';

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }
        conn.query(query, [usuarioLogin, usuarioSenha], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao buscar o login');
            }
            if (result.length > 0 && result[0].usuarioStatus > 0) {
                const usuarioSetor = result[0].usuarioSetor;
                // Retornar dados do setor
                return res.json({ success: true, usuarioSetor });
            } else {
                return res.json({ success: false, message: 'Usuário ou senha incorretos' });
            }
        });
    });
};

module.exports = controller;