const controller = {}; //cria o método do controller

//método para salvar a ordem de serviço
controller.save = (req, res) => {
    const { OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKmRetirada, OsKmDevolucao, OsStatus, OsValorPgto } = req.body;
    const dpto = req.query.dpto;
    
    if (!OsNum || !OsFuncMat || !OsClienteCPF || !OsVeicPlaca || !OsDataRetirada || !OsDataDevolucao || !OsKmRetirada || !OsKmDevolucao || !OsStatus || !OsValorPgto) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `INSERT INTO ordem_de_servico (OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKmRetirada, OsKmDevolucao, OsStatus, OsValorPgto) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKmRetirada, OsKmDevolucao, OsStatus, OsValorPgto], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao salvar a ordem de serviço');
            }
            
            if (dpto == 1){
                res.redirect('/ordemservico?dpto=1');
            }
            else if (dpto == 4){
                res.redirect('/ordemservico?dpto=4');
            } else {
                return res.status(404).send("Not Found");
            }
        });
    });
};

// é todo para listar os ordem de servico e navegar entre eles
controller.listOS = (req, res) => {
    const ordIndex = parseInt(req.query.ordIndex) || 0; // Pega o índice do ordem da query string, se existir
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta todos os ordem de servico no banco de dados
        conn.query('SELECT * FROM ordem_de_servico', (err,ordemservico)  => {
            if (err) {
                return res.status(500).send('Erro ao consultar as ordens de servico');
            }

            // Pega o ord atual baseado no índice
            const ord = ordemservico[ordIndex];

            if (dpto == 1){
                res.render('ordemservicoAtend', {
                data: ordemservico,
                ordAtual: ord,
                ordIndex: ordIndex,
                isEdit: false
                
                });
            
            }
            else if (dpto == 4){
                res.render('ordemservico', {
                data: ordemservico,
                ordAtual: ord,
                ordIndex: ordIndex,
                isEdit: false
                
                });

            }else{
                return res.status(404).send("Not Found");
            }
        });
    });
};

// Método para navegação para o próximo ord
controller.next = (req, res) => {
    const ordIndex = parseInt(req.query.ordIndex) + 1; // Incrementa o índice
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM ordem_de_servico', (err, ordemservico) => {
            if (err) {
                return res.status(500).send('Erro ao consultar as ordens de servico');
            }

            // Se o índice for maior que o número total de ordemservico, volta para o primeiro
            if (ordIndex >= ordemservico.length) {
                if(dpto == 1){
                    return res.redirect(`/ordemservico?ordIndex=0&dpto=1`);
                }
                else if(dpto == 4){
                    return res.redirect(`/ordemservico?ordIndex=0&dpto=4`);
                } else {res.status(404).send("Not Found")}
            }

            if (dpto == 1){
                res.redirect(`/ordemservico?ordIndex=${ordIndex}&dpto=1`);
            }
            else if (dpto == 4){
                res.redirect(`/ordemservico?ordIndex=${ordIndex}&dpto=4`);
            }else {res.status(404).send("Not Found")}
        });
    });
};

// Método para navegação para o ord anterior
controller.prev = (req, res) => {
    const ordIndex = parseInt(req.query.ordIndex); // Índice recebido
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM ordem_de_servico', (err, ordemservico) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os ordemservico');
            }

            const totalordemservico = ordemservico.length; // Total de funcionários
            if (totalordemservico === 0) {
                return res.status(404).send('Nenhum funcionário encontrado');
            }

            let auxordIndex = ordIndex - 1; // Decrementa o índice

            if (auxordIndex < 0) {
                auxordIndex = totalordemservico - 1;
            }

            // Verifica o departamento e redireciona
            if (dpto == 1){
                res.redirect(`/ordemservico?ordIndex=${auxordIndex}&dpto=1`);
            } else if (dpto == 4) {
                res.redirect(`/ordemservico?ordIndex=${auxordIndex}&dpto=4`);
            } else {
                res.status(404).send("NotFound");
            }
        });
    });
};

//método para deletar o ord
controller.delete = (req, res) => {
    const OsNum = req.query.OsNum;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM ordem_de_servico WHERE OsNum = ?', [OsNum], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }
            if (dpto == 1){
                res.redirect('/ordemservico?dpto=1');
            }
            else if (dpto == 4){
                res.redirect('/ordemservico?dpto=4');
            } else {
                return res.status(404).send("Not Found");
            }
        });
    });
};

//método para editar o ord
controller.update = (req, res) => {
    const { OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKmRetirada, OsKmDevolucao, OsStatus, OsValorPgto } = req.body;
    const dpto = req.query.dpto;

    if (!OsNum || !OsFuncMat || !OsClienteCPF || !OsVeicPlaca || !OsDataRetirada || !OsDataDevolucao || !OsKmRetirada || !OsKmDevolucao || !OsStatus || !OsValorPgto) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE ordem_de_servico SET OsFuncMat = ?, OsClienteCPF = ?, OsVeicPlaca = ?, OsDataRetirada = ?, OsDataDevolucao = ?, OsKmRetirada = ?, OsKmDevolucao = ?, OsStatus = ?, OsValorPgto = ? WHERE OsNum = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKmRetirada, OsKmDevolucao, OsStatus, OsValorPgto], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar a ordem de serviço');
            }

            if (dpto == 1){
                res.redirect('/ordemservico?dpto=1');
            }
            else if (dpto == 4){
                res.redirect('/ordemservico?dpto=4');
            } else {
                return res.status(404).send("Not Found");
            }
        });
    });
};


controller.edit = (req, res) => { 
    
    const OsNum = req.query.OsNum;
    const dpto = req.query.dpto;
     
  
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ordemservico WHERE OsNum = ?', [OsNum], (err, ordemservico) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }

            // Verifica se o ord foi encontrado
            if (ordemservico.length === 0) {
                return res.status(404).send('ordem de serviço não encontrado');
            }

            if (dpto == 1){
                res.render('ordemservicoAtend', {
                    ordAtual: ordemservico[0],
                    isEdit: true,
                    ordIndex: req.query.ordIndex || 0
                });
            }
            else if (dpto == 4){
                res.render('ordemservico', {
                    ordAtual: ordemservico[0],
                    isEdit: true,
                    ordIndex: req.query.ordIndex || 0
                });
            }else {return res.status(404).send("Not Found")}
        });
    });
      
};


  
module.exports = controller;