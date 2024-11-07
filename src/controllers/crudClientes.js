const res = require("express/lib/response");
const controller = {}; //cria o método do controller

//método para salvar o cliente
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO clientes set ?', [data], (err, cliente) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};
//método para deletar o cliente
controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM clientes WHERE id = ?', [id], (err, rows) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};

//método para editar o cliente
controller.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes WHERE id = ?', [id], (err, cliente) => {
            if (err) {
                res.json(err);
            }
            
            res.render('clientes_edit', {
                data: cliente[0]
            });
        });
    });
};