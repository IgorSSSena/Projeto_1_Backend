const express = require('express');
const router = express.Router();

const eventos = [];

router.post('/', (req, res) => {
  const { nome, data, local } = req.body;
  const novoEvento = { id: Date.now(), nome, data, local };
  eventos.push(novoEvento);
  res.status(201).json(novoEvento);
});

router.get('/', (req, res) => {
  res.json(eventos);
});

module.exports = router;