
const { parse } = require('url');
const usuarioController = require('./UsuarioController');
const compromissoController = require('./CompromissoController');
const notificacaoController = require('./NotificacaoController');

function handleRequest(req, res) {
    const parsedUrl = parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    res.setHeader('Content-Type', 'application/json');

    if (path.startsWith('/usuarios')) {
        return usuarioController.handle(req, res, path, method);
    }
    if (path.startsWith('/compromissos')) {
        return compromissoController.handle(req, res, path, method);
    }
    if (path.startsWith('/notificacoes')) {
        return notificacaoController.handle(req, res, path, method);
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
}

module.exports = { handleRequest };
