const controller = {}; //cria o método do controller

//método para salvar o veiculo
controller.saveVeic = (req, res) => {
    const { veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado} = req.body;
    
    if (!veicPlaca || !veicMarca || !veicModelo || !veicCor || !veicAno || !veicComb || !veicCat || !veicStatusAlocado) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `INSERT INTO veiculos (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o veículo');
            }

            res.redirect('/veiculo');
        });
    });
};

// Método para listar os veiculos e navegar entre eles
controller.listVeic = (req, res) => {
    const veicIndex = parseInt(req.query.veicIndex) || 0; // Pega o índice do veiculo da query string, se existir
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta todos os veiculos no banco de dados
        conn.query('SELECT * FROM veiculos', (err, veiculos) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os veiculos');
            }

            // Pega o veiculo atual baseado no índice
            const veiculo = veiculos[veicIndex];

            // Exibe a página com o veiculo atual e os botões de navegação
            res.render('veiculo', {
                data: veiculos,  // Passa todos os veiculos para o template
                veicAtual: veiculo,
                veicIndex: veicIndex,
        
            });
        });
    });
};

// Método para navegação para o próximo veiculo
controller.nextVeic = (req, res) => {


    const veicIndex = parseInt(req.query.veicIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM veiculos', (err, veiculos) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os veiculos');
            }

            // Se o índice for maior que o número total de clientes, volta para o primeiro
            if (veicIndex >= veiculos.length) {
                return res.redirect(`/veiculo?veicIndex=0`);
            }

            // Redireciona para o próximo cliente
            res.redirect(`/veiculo?veicIndex=${veicIndex}`);
        });
    });
};

// Método para navegação para o veiculo anterior
controller.prevVeic = (req, res) => {
    const veicIndex = parseInt(req.query.veicIndex) - 1; // Decrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM veiculos', (err, veiculos) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os veiculos');
            }

            // Se o índice for menor que 0, volta para o último veic
            if (veicIndex < 0) {
                return res.redirect(`/veiculo?veicIndex=${veiculos.length - 1}`);
            }

            // Redireciona para o veic anterior
            res.redirect(`/veiculo?veicIndex=${veicIndex}`);
        });
    });
};

//método para deletar o veic
controller.deleteVeic = (req, res) => {
    const { veicPlaca } = req.params;
    

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM veiculos WHERE veicPlaca = ?', [veicPlaca], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao deletar o veiculo');
            }

            res.redirect('/veiculo');
        });
    });
};

//método para editar o veic
controller.edit = (req, res) => {
    const { veicPlaca } = req.params;
  
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM veiculos WHERE veicPlaca = ?', [veicPlaca], (err, veiculos) => {
        if (err) {
          return res.status(500).send('Erro ao conectar ao banco de dados');
        }
        
        res.render('veiculo', {
          data: veiculos[0]
        });
      });
    });
  };

module.exports = controller;