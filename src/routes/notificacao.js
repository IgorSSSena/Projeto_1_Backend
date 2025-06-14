const express = require('express');
const router = express.Router();
const NotificacaoController = require('../controllers/NotificacaoController');

router.get('/pendentes', NotificacaoController.listarPendentes);
router.post('/enviar/:id', NotificacaoController.enviar);

module.exports = router;
