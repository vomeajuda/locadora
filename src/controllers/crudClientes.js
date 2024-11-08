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

// Método para listar os clientes e navegar entre eles
controller.listClientes = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) || 0; // Pega o índice do cliente da query string, se existir
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta todos os clientes no banco de dados
        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes');
            }

            // Pega o cliente atual baseado no índice
            const cliente = clientes[clienteIndex];

            // Exibe a página com o cliente atual e os botões de navegação
            res.render('clientes', {
                data: clientes,  // Passa todos os clientes para o template
                clienteAtual: cliente,
                clienteIndex: clienteIndex,
                totalClientes: clientes.length // Passa o número total de clientes
            });
        });
    });
};

// Método para navegação para o próximo cliente
controller.next = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes');
            }

            // Se o índice for maior que o número total de clientes, volta para o primeiro
            if (clienteIndex >= clientes.length) {
                return res.redirect(`/clientes?clienteIndex=0`);
            }

            // Redireciona para o próximo cliente
            res.redirect(`/clientes?clienteIndex=${clienteIndex}`);
        });
    });
};

// Método para navegação para o cliente anterior
controller.prev = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) - 1; // Decrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes');
            }

            // Se o índice for menor que 0, volta para o último cliente
            if (clienteIndex < 0) {
                return res.redirect(`/clientes?clienteIndex=${clientes.length - 1}`);
            }

            // Redireciona para o cliente anterior
            res.redirect(`/clientes?clienteIndex=${clienteIndex}`);
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