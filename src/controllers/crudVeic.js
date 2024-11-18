const controller = {}; //cria o método do controller

//método para salvar o veiculo
controller.saveVeic = (req, res) => {
    const { veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado} = req.body;
    const dpto = req.query.dpto;
    
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

            if (dpto == 2){
                res.redirect('/veiculo?dpto=2');
            } else if (dpto == 3){
                res.redirect('/veiculo?dpto=3');
            } else if (dpto == 4){
                res.redirect('/veiculo?dpto=4');
            } else {return res.status(404).send("Not Found")}
        });
    });
};

// Método para listar os veiculos e navegar entre eles
controller.listVeic = (req, res) => {
    const veicIndex = parseInt(req.query.veicIndex) || 0; // Pega o índice do veiculo da query string, se existir
    const dpto = req.query.dpto;
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
            if (dpto == 2){
                res.render('veiculoAdm', {
                    data: veiculos,  // Passa todos os veiculos para o template
                    veicAtual: veiculo,
                    veicIndex: veicIndex,
                    isEdit: false
                });
            } else if (dpto == 3){
                res.render('veiculoFinan', {
                    data: veiculos,  // Passa todos os veiculos para o template
                    veicAtual: veiculo,
                    veicIndex: veicIndex,
                    isEdit: false
                });
            } else if (dpto == 4){
                res.render('veiculo', {
                    data: veiculos,  // Passa todos os veiculos para o template
                    veicAtual: veiculo,
                    veicIndex: veicIndex,
                    isEdit: false
                });
            }
        });
    });
};

// Método para navegação para o próximo veiculo
controller.nextVeic = (req, res) => {

    const dpto = req.query.dpto;
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
                if (dpto == 2){
                    return res.redirect(`/veiculo?veicIndex=0&dpto=2`);
                } else if (dpto == 3){
                    return res.redirect(`/veiculo?veicIndex=0&dpto=3`);
                } else if (dpto == 4){
                    return res.redirect(`/veiculo?veicIndex=0&dpto=4`);
                } else {return res.status(404).send("Not Found")}
            }

            // Redireciona para o próximo cliente
            if (dpto == 2){
                res.redirect(`/veiculo?veicIndex=${veicIndex}&dpto=2`);
            } else if (dpto == 3){
                res.redirect(`/veiculo?veicIndex=${veicIndex}&dpto=3`);
            } else if (dpto == 4){
                res.redirect(`/veiculo?veicIndex=${veicIndex}&dpto=4`);
            } else {return res.status(404).send("Not Found")}
        });
    });
};

// Método para navegação para o veiculo anterior
controller.prevVeic = (req, res) => {
    const veicIndex = parseInt(req.query.veicIndex); // Índice recebido
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM veiculos', (err, veiculos) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os veiculos');
            }

            const totalVeiculos = veiculos.length;
            if (totalVeiculos === 0) {
                return res.status(404).send('Nenhum veiculo encontrado');
            }

            let auxVeicIndex = veicIndex - 1; // Decrementa o índice

            if (auxVeicIndex < 0) {
                auxVeicIndex = totalVeiculos - 1;
            }

            // Verifica o departamento e redireciona
            if (dpto == 2) {
                res.redirect(`/veiculo?veicIndex=${auxVeicIndex}&dpto=2`);
            } else if (dpto == 3) {
                res.redirect(`/veiculo?veicIndex=${auxVeicIndex}&dpto=3`);
            } else if (dpto == 4) {
                res.redirect(`/veiculo?veicIndex=${auxVeicIndex}&dpto=4`);
            } else {
                res.status(404).send("Departamento não encontrado");
            }
        });
    });
};

//método para deletar o veic
controller.deleteVeic = (req, res) => {
    const veicPlaca = req.query.veicPlaca;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM veiculos WHERE veicPlaca = ?', [veicPlaca], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao deletar o veiculo');
            }

            if (dpto == 2){
                res.redirect('/veiculo?dpto=2');
            } else if (dpto == 3){
                res.redirect('/veiculo?dpto=3');
            } else if (dpto == 4){
                res.redirect('/veiculo?dpto=4');
            } else {return res.status(404).send("Not Found")}
        });
    });
};


controller.updateVeic = (req, res) => {
    const { veicPlacaAux, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado } = req.body;
    const dpto = req.query.dpto;
    
    if (!veicPlacaAux || !veicMarca || !veicModelo || !veicAno || !veicCor || !veicComb || !veicCat || !veicStatusAlocado) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE veiculos SET veicMarca = ?, veicModelo = ?, veicCor = ?, veicCat = ?, veicAno = ?, veicComb = ?, veicStatusAlocado = ? WHERE veicPlaca = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [veicMarca, veicModelo, veicCor, veicCat, veicAno, veicComb, veicStatusAlocado, veicPlacaAux], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o veiculo');
            }

            if (dpto == 2){
                res.redirect('/veiculo?dpto=2');
            } else if (dpto == 3){
                res.redirect('/veiculo?dpto=3');
            } else if (dpto == 4){
                res.redirect('/veiculo?dpto=4');
            } else {return res.status(404).send("Not Found")}
        });
    });
};


controller.editVeic = (req, res) => { 
    
    const veicPlaca = req.query.veicPlaca;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM veiculos WHERE veicPlaca = ?', [veicPlaca], (err, veiculos) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Verifica se o cliente foi encontrado
        if (veiculos.length === 0) {
            return res.status(404).send('Veiculo não encontrado');
        }
          
        if (dpto == 2){
            res.render('veiculoAdm', {
                veicAtual: veiculos[0],
                isEdit: true,
                veicIndex: req.query.veicIndex || 0
            });
        } else if (dpto == 3){
            res.render('veiculoFinan', {
                veicAtual: veiculos[0],
                isEdit: true,
                veicIndex: req.query.veicIndex || 0
            });
        } else if (dpto == 4){
            res.render('veiculo', {
                veicAtual: veiculos[0],
                isEdit: true,
                veicIndex: req.query.veicIndex || 0
            });
        }
      });
  });
    
}

module.exports = controller;