const express = require('express');
const router = express.Router();
const CompromissoController = require('../controllers/CompromissoController');
const autenticar = require('../services/autenticacao');

router.post('/', autenticar, CompromissoController.criar);
router.get('/', autenticar, CompromissoController.listar);

router.get('/dia', autenticar, CompromissoController.buscarPorDia);
router.get('/periodo', autenticar, CompromissoController.buscarPorPeriodo);
router.get('/nome', autenticar, CompromissoController.buscarPorNome);
router.get('/mes', autenticar, CompromissoController.buscarPorMes);

module.exports = router;
