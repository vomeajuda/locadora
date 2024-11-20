const controller = {}; //cria o método do controller

//método para salvar o cliente
controller.save = (req, res) => {
    const { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteDataNasc, clienteCNH, clienteCidade, clienteCNHCat} = req.body;
    const dpto = req.query.dpto;
    
    if (!clienteCPF || !clienteNome || !clienteEnde || !clienteDataNasc || !clienteTel || !clienteCNH || !clienteCidade || !clienteCNHCat) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `INSERT INTO clientes (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o cliente');
            }
            
            if (dpto == 1){
                res.redirect('/clientes?dpto=1');
            }
            else if (dpto == 2){
                res.redirect('/clientes?dpto=2');
            }
            else if (dpto == 3){
                res.redirect('/clientes?dpto=3')
            }
            else if (dpto == 4){
                res.redirect('/clientes?dpto=4');
            } else {
                return res.status(404).send("Not Found");
            }
        });
    });
};

// Método para listar os clientes e navegar entre eles
controller.listClientes = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) || 0; // Pega o índice do cliente da query string, se existir
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta todos os clientes no banco de dados
        conn.query('SELECT * FROM clientes', (err,clientes)  => {
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes');
            }

            // Pega o cliente atual baseado no índice
            const cliente = clientes[clienteIndex];

            if (dpto == 1){
                res.render('clientesAtend', {
                data: clientes,
                clienteAtual: cliente,
                clienteIndex: clienteIndex,
                isEdit: false
                
                });
            }
            else if (dpto == 2){
                res.render('clientesAdm', {
                data: clientes,
                clienteAtual: cliente,
                clienteIndex: clienteIndex,
                isEdit: false
                
                });
            }
            else if (dpto == 3){
                res.render('clientesFinan', {
                data: clientes,
                clienteAtual: cliente,
                clienteIndex: clienteIndex,
                isEdit: false
                
                });
            }
            else if (dpto == 4){
                res.render('clientes', {
                data: clientes,
                clienteAtual: cliente,
                clienteIndex: clienteIndex,
                isEdit: false
                
                });
            }else{
                return res.status(404).send("Not Found");
            }
        });
    });
};

// Método para navegação para o próximo cliente
controller.next = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex) + 1; // Incrementa o índice
    const dpto = req.query.dpto;
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
                if(dpto == 1){
                    return res.redirect(`/clientes?clienteIndex=0&dpto=1`);
                }
                else if(dpto == 2){
                    return res.redirect(`/clientes?clienteIndex=0&dpto=2`);
                }
                else if(dpto == 3){
                    return res.redirect(`/clientes?clienteIndex=0&dpto=3`);
                }
                else if(dpto == 4){
                    return res.redirect(`/clientes?clienteIndex=0&dpto=4`);
                } else {res.status(404).send("Not Found")}
            }

            if (dpto == 1){
                res.redirect(`/clientes?clienteIndex=${clienteIndex}&dpto=1`);
            }
            else if (dpto == 2){
                res.redirect(`/clientes?clienteIndex=${clienteIndex}&dpto=2`);
            }
            else if (dpto == 3){
                res.redirect(`/clientes?clienteIndex=${clienteIndex}&dpto=3`);
            }
            else if (dpto == 4){
                res.redirect(`/clientes?clienteIndex=${clienteIndex}&dpto=4`);
            }else {res.status(404).send("Not Found")}
        });
    });
};

// Método para navegação para o cliente anterior
controller.prev = (req, res) => {
    const clienteIndex = parseInt(req.query.clienteIndex); // Índice recebido
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes');
            }

            const totalClientes = clientes.length; // Total de funcionários
            if (totalClientes === 0) {
                return res.status(404).send('Nenhum funcionário encontrado');
            }

            let auxClienteIndex = clienteIndex - 1; // Decrementa o índice

            if (auxClienteIndex < 0) {
                auxClienteIndex = totalClientes - 1;
            }

            // Verifica o departamento e redireciona
            if (dpto == 1){
                res.redirect(`/clientes?clienteIndex=${auxClienteIndex}&dpto=1`);
            } else if (dpto == 2) {
                res.redirect(`/clientes?clienteIndex=${auxClienteIndex}&dpto=2`);
            } else if (dpto == 3) {
                res.redirect(`/clientes?clienteIndex=${auxClienteIndex}&dpto=3`);
            } else if (dpto == 4) {
                res.redirect(`/clientes?clienteIndex=${auxClienteIndex}&dpto=4`);
            } else {
                res.status(404).send("NotFound");
            }
        });
    });
};

//método para deletar o cliente
controller.delete = (req, res) => {
    const clienteCPF = req.query.clienteCPF;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM clientes WHERE clienteCPF = ?', [clienteCPF], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }
            if (dpto == 1){
                res.redirect('/clientes?dpto=1');
            }
            else if (dpto == 2){
                res.redirect('/clientes?dpto=2');
            }
            else if (dpto == 3){
                res.redirect('/clientes?dpto=3')
            }
            else if (dpto == 4){
                res.redirect('/clientes?dpto=4');
            } else {
                return res.status(404).send("Not Found");
            }
        });
    });
};

//método para editar o cliente
controller.update = (req, res) => {
    const { clienteCPFaux, clienteNome, clienteEnde, clienteTel, clienteDataNasc, clienteCNH, clienteCidade, clienteCNHCat } = req.body;
    const dpto = req.query.dpto;

    if (!clienteCPFaux || !clienteNome || !clienteEnde || !clienteDataNasc || !clienteTel || !clienteCNH || !clienteCidade || !clienteCNHCat) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE clientes SET clienteNome = ?, clienteEnde = ?, clienteTel = ?, clienteCidade = ?, clienteDataNasc = ?, clienteCNH = ?, clienteCNHCat = ? WHERE clienteCPF = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat, clienteCPFaux], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o cliente');
            }

            if (dpto == 1){
                res.redirect('/clientes?dpto=1');
            }
            else if (dpto == 2){
                res.redirect('/clientes?dpto=2');
            }
            else if (dpto == 3){
                res.redirect('/clientes?dpto=3')
            }
            else if (dpto == 4){
                res.redirect('/clientes?dpto=4');
            } else {
                return res.status(404).send("Not Found");
            }
        });
    });
};


controller.edit = (req, res) => { 
    
    const clienteCPF = req.query.clienteCPF;
    const dpto = req.query.dpto;
     
  
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes WHERE clienteCPF = ?', [clienteCPF], (err, clientes) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }

            // Verifica se o cliente foi encontrado
            if (clientes.length === 0) {
                return res.status(404).send('Cliente não encontrado');
            }

            if (dpto == 1){
                res.render('clientesAtend', {
                    clienteAtual: clientes[0],
                    isEdit: true,
                    clienteIndex: req.query.clienteIndex || 0
                });
            }
            else if (dpto == 2){
                res.render('clientesAdm', {
                    clienteAtual: clientes[0],
                    isEdit: true,
                    clienteIndex: req.query.clienteIndex || 0
                });
            }
            else if (dpto == 3){
                res.render('clientesFinan', {
                    clienteAtual: clientes[0],
                    isEdit: true,
                    clienteIndex: req.query.clienteIndex || 0
                });
            }
            else if (dpto == 4){
                res.render('clientes', {
                    clienteAtual: clientes[0],
                    isEdit: true,
                    clienteIndex: req.query.clienteIndex || 0
                });
            }else {return res.status(404).send("Not Found")}
        });
    });
      
};

controller.busca = (req, res) => {
    const { cpf } = req.query;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(
            'SELECT * FROM clientes WHERE clienteCPF = ? OR clienteNome = ?',
            [cpf, cpf],
            (err, clientes) => {
                if (err) {
                    return res.status(500).send('Erro ao consultar os clientes');
                }

                if(clientes.length === 0) {
                    return res.status(404).send('Nenhum cliente encontrado');
                }
                
                if (dpto == 4){
                    res.render('buscacli', {
                        data: clientes,
                        isSearch: true,
                    });
                } else if (dpto == 5){
                    res.render('buscacliCopa', {
                        data: clientes,
                        isSearch: true,
                    });
                }
            }
        );
    });
};

  
module.exports = controller;