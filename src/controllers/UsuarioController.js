const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LogService = require('../services/LogService');

module.exports = {
  async registrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);
      const usuario = await Usuario.create({ nome, email, senhaHash });

      LogService.logInfo(`Novo usuário registrado: ${email}`);

      res.status(201).json(usuario);
    } catch (erro) {
      LogService.logErro(`Erro ao registrar usuário (${req.body.email}): ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ email });
      if (!usuario || !usuario.validarSenha(senha)) {
        LogService.logErro(`Tentativa de login falha para o email: ${email}`);
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      LogService.logInfo(`Login bem-sucedido para o usuário: ${email}`);

      res.json({ token });
    } catch (erro) {
      LogService.logErro(`Erro no login do usuário (${req.body.email}): ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  }
};
