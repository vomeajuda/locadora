const controller = {}; //cria o método do controller

//método para salvar o cliente
controller.save = (req, res) => {
    const { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteDataNasc, clienteCNH, clienteCidade} = req.body;
    
    if (!clienteCPF || !clienteNome || !clienteEnde || !clienteDataNasc || !clienteTel || !clienteCNH || !clienteCidade) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o cliente');
            }

            res.redirect('/clientes');
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

            res.redirect('/clientes');
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