
const Compromisso = require('../models/Compromisso');
const logService = require('../services/LogService');

async function handle(req, res, path, method) {
    try {
        if (method === 'GET') {
            const lista = await Compromisso.find();
            res.end(JSON.stringify(lista));
        }
        else if (method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const dados = JSON.parse(body);
                const item = new Compromisso(dados);
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
                const atualizado = await Compromisso.findByIdAndUpdate(id, dados, { new: true });
                if (atualizado) res.end(JSON.stringify(atualizado));
                else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ erro: 'Compromisso não encontrado' }));
                }
            });
        }
        else if (method === 'DELETE') {
            const id = path.split('/')[2];
            const removido = await Compromisso.findByIdAndDelete(id);
            if (removido) res.end(JSON.stringify(removido));
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ erro: 'Compromisso não encontrado' }));
            }
        } else {
            res.statusCode = 405;
            res.end(JSON.stringify({ erro: 'Método não permitido' }));
        }
    } catch (erro) {
        logService.registrarErro('Erro em CompromissoController: ' + erro.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ erro: 'Erro interno no servidor' }));
    }
}

module.exports = { handle };
