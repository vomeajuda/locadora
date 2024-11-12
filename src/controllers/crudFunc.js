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

            res.redirect('/funcionarios');
        });
    });
};

// Método para listar os funcionarios e navegar entre eles
controller.listFunc = (req, res) => {
    const funcIndex = parseInt(req.query.funcIndex) || 0; // Pega o índice do func da query string, se existir
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        // Consulta todos os funcionarios no banco de dados
        conn.query('SELECT * FROM funcionarios', (err, funcionarios) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os funcionarios');
            }

            // Pega o func atual baseado no índice
            const func = funcionarios[funcIndex];

            // Exibe a página com o func atual e os botões de navegação
            res.render('funcionarios', {
                data: funcionarios,  // Passa todos os funcionarios para o template
                funcAtual: func,
                funcIndex: funcIndex,
                totalFunc: func.length // Passa o número total de funcionarios
            });
        });
    });
};

// Método para navegação para o próximo funcionario
controller.next = (req, res) => {
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
                return res.redirect(`/funcionarios?funcIndex=0`);
            }

            // Redireciona para o próximo func
            res.redirect(`/funcionarios?funcIndex=${funcIndex}`);
        });
    });
};

// Método para navegação para o funcionario anterior
controller.prev = (req, res) => {
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
                return res.redirect(`/funcionarios?funcIndex=${funcionarios.length - 1}`);
            }

            // Redireciona para o func anterior
            res.redirect(`/funcionarios?funcIndex=${funcIndex}`);
        });
    });
};

//método para deletar o func
controller.delete = (req, res) => {
    const { funcMatricula } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM funcionarios WHERE funcMatricula = ?', [funcMatricula], (err, rows) => {
            if (err) {
                return res.status(500).send('Erro ao conectar ao banco de dados');
            }

            res.redirect('/funcionarios');
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
        
        res.render('funcionarios', {
          data: funcionarios[0]
        });
      });
    });
  };

module.exports = controller;