const controller = {}; //cria o método do controller

//método para salvar o funcionario
controller.save = (req, res) => {
    const { funcMatricula, funcNome, funcDepto, funcSalario, funcAdmissao, funcFilho, funcSexo, funcAtivo} = req.body;
    
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

            res.redirect('/funcionario');
        });
    });
};

// Método para listar os funcionarios e navegar entre eles
controller.listFuncionario = (req, res) => {
    const funcIndex = parseInt(req.query.funcIndex) || 0; // Pega o índice do funcionario da query string, se existir
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
            res.render('funcionario', {
                data: funcionarios,  // Passa todos os funcionarios para o template
                funcAtual: funcionario,
                funcIndex: funcIndex,
        
            });
        });
    });
};

// Método para navegação para o próximo funcionario
controller.nextFunc = (req, res) => {


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
                return res.redirect(`/funcionario?funcIndex=0`);
            }

            // Redireciona para o próximo cliente
            res.redirect(`/funcionario?funcIndex=${funcIndex}`);
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
                return res.redirect(`/funcionario?funcIndex=${funcionarios.length - 1}`);
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

//método para editar o func
controller.edit = (req, res) => {
    const { funcMatricula } = req.params;
  
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, funcionarios) => {
        if (err) {
          return res.status(500).send('Erro ao conectar ao banco de dados');
        }
        
        res.render('funcionario', {
          data: funcionarios[0]
        });
      });
    });
  };

module.exports = controller;