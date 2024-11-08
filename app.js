const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const path = require('path');
const app = express();
require('dotenv').config();

const PASS = process.env.DATABASE_PASSWORD;

const rotas = require('./src/routers/rotas');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'bdlocadora_ds'
}, 'single'));
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('elprimotors');
});

app.get('/buscacli', (req, res) => {
    res.render('buscacli');
});

app.get('/buscafun', (req, res) => {
    res.render('buscafun');
});

app.get('/buscaord', (req, res) => {
    res.render('buscaord');
});

app.get('/buscavei', (req, res) => {
    res.render('buscavei');
});

app.get('/clientes', (req, res) => {
    res.render('clientes');
});

app.get('/elprimotors', (req, res) => {
    res.render('elprimotors');
});

app.get('/funcionario', (req, res) => {
    res.render('funcionario');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/ordemservico', (req, res) => {
    res.render('ordemservico');
});

app.get('/veiculo', (req, res) => {
    res.render('veiculo');
});

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})