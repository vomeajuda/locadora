const controller = {}; //cria o método do controller

//método para salvar o usuarios
controller.save = (req, res) =>{
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO usuarios set ?', [data], (err, cliente) =>{
        if (err) {
            res.json(err);
        }
        console.log
        res.redirect('/');
        });
    });
};



    

module.exports = controller;