const controller = {}; //cria o método do controller

//método para salvar os funcionarios
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json('Erro ao conectar ao banco de dados');
        }

        conn.query('INSERT INTO funcionarios set ?', [data], (err, funcionarios) => {
            if (err) {
                return res.status(500).json('Erro ao conectar ao banco de dados');
            }

            res.redirect('/');
        });
    });
};
//método para deletar os funcionarios
controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM funcionarios WHERE id = ?', [id], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }

            res.redirect('/');
        });
    });
};

//método para editar os funcionarios
controller.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM funcionarios WHERE id = ?', [id], (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }
            
            res.render('/', {
                data: funcionarios[0]
            });
        });
    });
};

module.exports = controller;