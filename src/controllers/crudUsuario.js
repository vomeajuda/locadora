const controller = {}; //cria o método do controller

//método para salvar o usuarios
controller.saveUser = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO usuarios set ?', [data], (err, cliente) =>{
        if (err) {
            res.json(err);
        }
        res.redirect('/usuarios');
        });
    });
};

controller.listUser = (req, res) => {
    const userIndex = parseInt(req.query.userIndex) || 0; // Pega o índice do funcionario da query string, se existir
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os usuarios');
            }

            const usuario = usuarios[userIndex];

            // Exibe a página com o funcionario atual e os botões de navegação
            res.render('usuarios', {
                data: usuarios,  // Passa todos os funcionarios para o template
                userAtual: usuario,
                userIndex: userIndex,
                isEdit: false
            });
        });
    });
};

controller.nextUser = (req, res) => {

    const userIndex = parseInt(req.query.userIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os usuários');
            }

            // Se o índice for maior que o número total de funcionarios, volta para o primeiro
            if (userIndex >= usuarios.length) {
                return res.redirect(`/usuarios?userIndex=0`);
            }

                res.redirect(`/usuarios?userIndex=${userIndex}`);
        });
    });
};

controller.prevUser = (req, res) => {
    const userIndex = parseInt(req.query.userIndex); // Índice recebido
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM usuarios', (err, usuarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os usuário');
            }

            const totalUsuarios = usuarios.length; // Total de funcionários
            if (totalUsuarios === 0) {
                return res.status(404).send('Nenhum usuário encontrado');
            }

            let auxUserIndex = userIndex - 1; // Decrementa o índice

            if (auxUserIndex < 0) {
                auxUserIndex = totalUsuarios - 1;
            }

            res.redirect(`/usuarios?userIndex=${auxUserIndex}`);
        });
    });
};

controller.deleteUser = (req, res) => {
    const usuarioLogin = req.query.usuarioLogin;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuarios WHERE usuarioLogin = ?', [usuarioLogin], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao deletar o usuario');
            }

            res.redirect('/usuarios');
        });
    });
};

controller.updateUser = (req, res) => {
    const { usuarioLogin, usuarioSenha, usuarioSetor, usuarioStatus} = req.body;
    
    if (!usuarioLogin || !usuarioSenha || !usuarioSetor || !usuarioStatus) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE usuarios SET usuarioSenha = ?, usuarioSetor = ?, usuarioStatus = ? WHERE usuarioLogin = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [usuarioSenha, usuarioSetor, usuarioStatus, usuarioLogin], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o cliente');
            }

            res.redirect('/usuarios');
        });
    });
};

controller.editUser = (req, res) => { 
    
    const usuarioLogin = req.query.usuarioLogin;

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM usuarios WHERE usuarioLogin = ?', [usuarioLogin], (err, usuarios) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Verifica se o cliente foi encontrado
        if (usuarios.length === 0) {
            return res.status(404).send('Usuario não encontrado');
        }

        res.render('usuarios', {
            userAtual: usuarios[0],
            isEdit: true,
            userIndex: req.query.userIndex || 0
        });
      });
  });
    
}

module.exports = controller;