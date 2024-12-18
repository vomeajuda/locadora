const controller = {}; //cria o método do controller

//método para salvar o funcionario
controller.save = (req, res) => {
    const { funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo} = req.body;
    const dpto = req.query.dpto;
    
    if (!funcMatricula || !funcNome || !funcDepto || !funcSalario || !funcAdmissao || !funcFilho || !funcSexo || !funcAtivo) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `INSERT INTO funcionarios (funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o funcionario');
            }

            if (dpto == 2){
                res.redirect('/funcionario?dpto=2');
            }
            else if (dpto == 3){
                res.redirect('/funcionario?dpto=3');
            }
            else if (dpto == 4){
                res.redirect('/funcionario?dpto=4');
            }
        });
    });
};

// Método para listar os funcionarios e navegar entre eles
controller.listFuncionario = (req, res) => {
    const funcIndex = parseInt(req.query.funcIndex) || 0; // Pega o índice do funcionario da query string, se existir
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta todos os funcionarios no banco de dados
        conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os funcionarios');
            }

            // Pega o funcionario atual baseado no índice
            const funcionario = funcionarios[funcIndex];

            // Exibe a página com o funcionario atual e os botões de navegação
            if (dpto == 2){
                res.render('funcionarioAdm', {
                    data: funcionarios,  // Passa todos os funcionarios para o template
                    funcAtual: funcionario,
                    funcIndex: funcIndex,
                    isEdit: false
                });
            }
            else if (dpto == 3){
                res.render('funcionarioFinan', {
                    data: funcionarios,  // Passa todos os funcionarios para o template
                    funcAtual: funcionario,
                    funcIndex: funcIndex,
                    isEdit: false
                });
            }
            else if (dpto == 4){
                res.render('funcionario', {
                    data: funcionarios,  // Passa todos os funcionarios para o template
                    funcAtual: funcionario,
                    funcIndex: funcIndex,
                    isEdit: false
                });
            }
        });
    });
};

// Método para navegação para o próximo funcionario
controller.nextFunc = (req, res) => {

    const dpto = req.query.dpto;
    const funcIndex = parseInt(req.query.funcIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os funcionarios');
            }

            // Se o índice for maior que o número total de funcionarios, volta para o primeiro
            if (funcIndex >= funcionarios.length) {
                if (dpto == 2){
                return res.redirect(`/funcionario?funcIndex=0&dpto=2`);
                }
                else if (dpto == 3){
                    return res.redirect(`/funcionario?funcIndex=0&dpto=3`);
                }
                else if (dpto == 4){
                    return res.redirect(`/funcionario?funcIndex=0&dpto=4`);
                }
            }

            // Redireciona para o próximo cliente
            if (dpto == 2){
                res.redirect(`/funcionario?funcIndex=${funcIndex}&dpto=2`);
            }
            else if (dpto == 3){
                res.redirect(`/funcionario?funcIndex=${funcIndex}&dpto=3`);
            }
            else if (dpto == 4){
                res.redirect(`/funcionario?funcIndex=${funcIndex}&dpto=4`);
            }
        });
    });
};

// Método para navegação para o funcionario anterior
controller.prevFunc = (req, res) => {
    const funcIndex = parseInt(req.query.funcIndex); // Índice recebido
    const dpto = req.query.dpto;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os funcionários');
            }

            const totalFuncionarios = funcionarios.length; // Total de funcionários
            if (totalFuncionarios === 0) {
                return res.status(404).send('Nenhum funcionário encontrado');
            }

            let auxFuncIndex = funcIndex - 1; // Decrementa o índice

            if (auxFuncIndex < 0) {
                auxFuncIndex = totalFuncionarios - 1;
            }

            // Verifica o departamento e redireciona
            if (dpto == 2) {
                res.redirect(`/funcionario?funcIndex=${auxFuncIndex}&dpto=2`);
            } else if (dpto == 3) {
                res.redirect(`/funcionario?funcIndex=${auxFuncIndex}&dpto=3`);
            } else if (dpto == 4) {
                res.redirect(`/funcionario?funcIndex=${auxFuncIndex}&dpto=4`);
            } else {
                res.status(404).send("Departamento não encontrado");
            }
        });
    });
};


//método para deletar o func
controller.deleteFunc = (req, res) => {
    const funcMatricula = req.query.funcMatricula;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao deletar o funcionario');
            }

            if (dpto == 2){
                res.redirect('/funcionario?dpto=2');
            }
            else if (dpto == 3){
                res.redirect('/funcionario?dpto=3');
            }
            else if (dpto == 4){
                res.redirect('/funcionario?dpto=4');
            }
        });
    });
};


controller.updateFunc = (req, res) => {
    const { funcMatriculaAux, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo } = req.body;
    const dpto = req.query.dpto;
    
    if (!funcMatriculaAux || !funcNome || !funcDepto || !funcAdmissao || !funcSalario || !funcFilho || !funcSexo || !funcAtivo) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE funcionarios SET funcNome = ?, funcDepto = ?, funcSalario = ?, funcSexo = ?, funcAdmissao = ?, funcFilho = ?, funcAtivo = ? WHERE funcMatricula = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [funcNome, funcDepto, funcSalario, funcSexo, funcAdmissao, funcFilho, funcAtivo, funcMatriculaAux], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o cliente');
            }

            if (dpto == 2){
                res.redirect('/funcionario?dpto=2');
            }
            else if (dpto == 3){
                res.redirect('/funcionario?dpto=3');
            }
            else if (dpto == 4){
                res.redirect('/funcionario?dpto=4');
            }
        });
    });
};


controller.editFunc = (req, res) => { 
    
    const funcMatricula = req.query.funcMatricula;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, funcionarios) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Verifica se o cliente foi encontrado
        if (funcionarios.length === 0) {
            return res.status(404).send('Funcionario não encontrado');
        }
        
        if (dpto == 2){
            res.render('funcionarioAdm', {
                funcAtual: funcionarios[0],
                isEdit: true,
                funcIndex: req.query.funcIndex || 0
            });
        }
        else if (dpto == 3){
            res.render('funcionarioFinan', {
                funcAtual: funcionarios[0],
                isEdit: true,
                funcIndex: req.query.funcIndex || 0
            });
        }
        else if (dpto == 4){
            res.render('funcionario', {
                funcAtual: funcionarios[0],
                isEdit: true,
                funcIndex: req.query.funcIndex || 0
            });
        }
      });
  });
    
};

controller.buscaFunc = (req, res) => {
    const { matricula } = req.query;
    const dpto = req.query.dpto;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(
            'SELECT * FROM funcionarios WHERE funcMatricula = ? OR funcNome = ?',
            [matricula, matricula],
            (err, funcionarios) => {
                if (err) {
                    return res.status(500).send('Erro ao consultar os funcionarios');
                }

                if(funcionarios.length === 0) {
                    return res.status(404).send('Nenhum funcionario encontrado');
                }
                
                if (dpto == 4){
                    res.render('buscafun', {
                        data: funcionarios,
                        isSearch: true,
                    });
                } else if (dpto == 5){
                    res.render('buscafunCopa', {
                        data: funcionarios,
                        isSearch: true,
                    });
                }
            }
        );
    });
};

module.exports = controller;