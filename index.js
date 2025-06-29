
const http = require('http');
const conectar = require('./config/conexaoBanco');
const { handleRequest } = require('./controllers/Router');

conectar();

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(3000, () => {
    console.log('Servidor Node.js com MongoDB rodando na porta 3000');
});
