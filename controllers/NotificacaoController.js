
const Notificacao = require('../models/Notificacao');
const logService = require('../services/LogService');

async function handle(req, res, path, method) {
    try {
        if (method === 'GET') {
            const lista = await Notificacao.find();
            res.end(JSON.stringify(lista));
        }
        else if (method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const dados = JSON.parse(body);
                const item = new Notificacao(dados);
                await item.save();
                res.end(JSON.stringify(item));
            });
        }
        else if (method === 'PUT') {
            const id = path.split('/')[2];
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const dados = JSON.parse(body);
                const atualizado = await Notificacao.findByIdAndUpdate(id, dados, { new: true });
                if (atualizado) res.end(JSON.stringify(atualizado));
                else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ erro: 'Notificação não encontrada' }));
                }
            });
        }
        else if (method === 'DELETE') {
            const id = path.split('/')[2];
            const removido = await Notificacao.findByIdAndDelete(id);
            if (removido) res.end(JSON.stringify(removido));
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ erro: 'Notificação não encontrada' }));
            }
        } else {
            res.statusCode = 405;
            res.end(JSON.stringify({ erro: 'Método não permitido' }));
        }
    } catch (erro) {
        logService.registrarErro('Erro em NotificacaoController: ' + erro.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ erro: 'Erro interno no servidor' }));
    }
}

module.exports = { handle };
