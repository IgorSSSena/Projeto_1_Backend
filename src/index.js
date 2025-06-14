const express = require('express');
const conectarBanco = require('./config/conexaoBanco');
require('dotenv').config();

const app = express();
app.use(express.json());

const usuariosRoute = require('./routes/usuarios');
const compromissosRoute = require('./routes/compromissos');
const notificacoesRoute = require('./routes/notificacao');

app.use('/usuarios', usuariosRoute);
app.use('/compromissos', compromissosRoute);
app.use('/notificacoes', notificacoesRoute);

app.get('/', (req, res) => res.send('API Agenda Eletrônica funcionando!'));

conectarBanco();

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
