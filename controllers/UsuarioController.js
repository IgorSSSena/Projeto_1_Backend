
const Usuario = require('../models/Usuario');
const fs = require('fs');
const logService = require('../services/LogService');

async function handle(req, res, path, method) {
    try {
        if (method === 'GET') {
            const usuarios = await Usuario.find();
            res.end(JSON.stringify(usuarios));
        } 
        else if (method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const dados = JSON.parse(body);
                const usuario = new Usuario(dados);
                await usuario.save();
                res.end(JSON.stringify(usuario));
            });
        }
        else if (method === 'PUT') {
            const id = path.split('/')[2];
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const dados = JSON.parse(body);
                const atualizado = await Usuario.findByIdAndUpdate(id, dados, { new: true });
                if (atualizado) res.end(JSON.stringify(atualizado));
                else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ erro: 'Usuário não encontrado' }));
                }
            });
        }
        else if (method === 'DELETE') {
            const id = path.split('/')[2];
            const removido = await Usuario.findByIdAndDelete(id);
            if (removido) res.end(JSON.stringify(removido));
            else {
                res.statusCode = 404;
                res.end(JSON.stringify({ erro: 'Usuário não encontrado' }));
            }
        } 
        else {
            res.statusCode = 405;
            res.end(JSON.stringify({ erro: 'Método não permitido' }));
        }
    } catch (erro) {
        logService.registrarErro('Erro em UsuarioController: ' + erro.message);
        res.statusCode = 500;
        res.end(JSON.stringify({ erro: 'Erro interno no servidor' }));
    }
}

module.exports = { handle };
