const express = require('express');
const router = express.Router();

const usuarios = []; // armazenamento em memória

router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;
  const novoUsuario = { id: Date.now(), nome, email, senha };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

router.get('/', (req, res) => {
  res.json(usuarios);
});

module.exports = router;