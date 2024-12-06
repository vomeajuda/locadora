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
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(rotas);

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})