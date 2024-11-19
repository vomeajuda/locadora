const controller = {}; //cria o método do controller

//método para salvar o usuarios
controller.saveUser = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO usuarios set ?', [data], (err, cliente) =>{
        if (err) {
            res.json(err);
        }
        res.redirect('/');
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
                data: funcionarios,  // Passa todos os funcionarios para o template
                funcAtual: funcionario,
                funcIndex: funcIndex,
                isEdit: true
            });
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
                return res.status(500).send('Erro ao consultar os usuários');
            }

            const totalUsuarios = usuarios.length;
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

module.exports = controller;