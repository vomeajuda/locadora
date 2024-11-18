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

            // Se o índice for maior que o número total de clientes, volta para o primeiro
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
    const funcIndex = parseInt(req.query.funcIndex) - 1; // Decrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os funcionarios');
            }

            // Se o índice for menor que 0, volta para o último func
            if (funcIndex < 0) {
                if (dpto == 2){
                return res.redirect(`/funcionario?funcIndex=${funcionarios.length}`);
                }
            }

            // Redireciona para o func anterior
            res.redirect(`/funcionario?funcIndex=${funcIndex}`);
        });
    });
};

//método para deletar o func
controller.deleteFunc = (req, res) => {
    const { funcMatricula } = req.params;
    

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao deletar o funcionario');
            }

            res.redirect('/funcionario');
        });
    });
};


controller.updateFunc = (req, res) => {
    const { funcMatriculaAux, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo } = req.body;
    
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

            res.redirect('/funcionario');
        });
    });
};


controller.editFunc = (req, res) => { 
    
    const funcMatricula = req.query.funcMatricula;
   

    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, funcionarios) => {
          if (err) {
              return res.status(500).send('Erro ao conectar ao banco de dados');
          }

          // Verifica se o cliente foi encontrado
          if (funcionarios.length === 0) {
              return res.status(404).send('Funcionario não encontrado');
          }
          
          res.render('funcionario', {
              funcAtual: funcionarios[0],
              isEdit: true,
              funcIndex: req.query.funcIndex || 0
          });
      });
  });
    
}

controller.buscaFunc = (req, res) => {
    const { matricula } = req.query

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta todos os clientes no banco de dados
        conn.query('SELECT * FROM funcionarios WHERE funcMatricula = ?', [matricula] , (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os funcionarios');
            }

            res.render('buscafun', {
                data: funcionarios,
                isSearch: true,
            })
        })
    })
}

module.exports = controller;