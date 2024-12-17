const controller = {}; //cria o método do controller

controller.listCat = (req, res) => {
    const catIndex = parseInt(req.query.catIndex) || 0; // Pega o índice do funcionario da query string, se existir
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM categoria', (err, categorias) => {
            if (err) {
                return res.status(500).send('Erro ao consultar as categorias');
            }

            const categoria = categorias[catIndex];

            // Exibe a página com a categoria atual e os botões de navegação
            res.render('categorias', {
                data: categorias,  // Passa todos os funcionarios para o template
                catAtual: categoria,
                catIndex: catIndex,
                isEdit: true
            });
        });
    });
};

controller.nextCat = (req, res) => {

    const catIndex = parseInt(req.query.catIndex) + 1; // Incrementa o índice
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM categoria', (err, categorias) => {
            if (err) {
                return res.status(500).send('Erro ao consultar as categorias');
            }

            // Se o índice for maior que o número total de funcionarios, volta para o primeiro
            if (catIndex >= categorias.length) {
                return res.redirect(`/categorias?catIndex=0`);
            }

                res.redirect(`/categorias?catIndex=${catIndex}`);
        });
    });
};

controller.prevCat = (req, res) => {
    const catIndex = parseInt(req.query.catIndex); // Índice recebido
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query('SELECT * FROM categoria', (err, categorias) => {
            if (err) {
                return res.status(500).send('Erro ao consultar as categorias');
            }

            const totalCat = categorias.length; // Total de funcionários
            if (totalCat === 0) {
                return res.status(404).send('Nenhuma categoria encontrada');
            }

            let auxCatIndex = catIndex - 1; // Decrementa o índice

            if (auxCatIndex < 0) {
                auxCatIndex = totalCat - 1;
            }

            res.redirect(`/categorias?catIndex=${auxCatIndex}`);
        });
    });
};

controller.updateCat = (req, res) => {
    const { CatCod, CatValor_km} = req.body;
    
    if (!CatCod || !CatValor_km) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `UPDATE categoria SET CatValor_km = ? WHERE CatCod = ?`;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send('Erro ao conectar ao banco de dados');
        }

        conn.query(query, [CatValor_km, CatCod], (err, result) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar a categoria');
            }

            res.redirect('/categorias');
        });
    });
};

module.exports = controller;