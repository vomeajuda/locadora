const controller = {}; //cria o método do controller

//método para salvar o cliente
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO clientes set ?', [data], (err, cliente) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }

            res.redirect('/');
        });
    });
};

//método para listar os clientes
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes', (err, cliente) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }

            res.render('clientes', {
                data: cliente
            });
        });
    });
};
//método para deletar o cliente
controller.delete = (req, res) => {
    const { clienteCPF } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM clientes WHERE clienteCPF = ?', [clienteCPF], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }

            res.redirect('/');
        });
    });
};

//método para editar o cliente
controller.edit = (req, res) => {
    const { clienteCPF } = req.params;
  
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM clientes WHERE clienteCPF = ?', [clienteCPF], (err, cliente) => {
        if (err) {
          return res.status(500).send('Erro ao conectar ao banco de dados');
        }
        
        res.render('clientes', {
          data: cliente[0]
        });
      });
    });
  };

module.exports = controller;