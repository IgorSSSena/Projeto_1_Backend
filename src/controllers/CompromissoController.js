const Compromisso = require('../models/Compromisso');
const LogService = require('../services/LogService');

module.exports = {
  async criar(req, res) {
    try {
      const dados = req.body;
      dados.idUsuario = req.usuarioId;
      const compromisso = await Compromisso.create(dados);

      LogService.logInfo(`Compromisso criado para usuário ${req.usuarioId}: ${compromisso.titulo}`);

      res.status(201).json(compromisso);
    } catch (erro) {
      LogService.logErro(`Erro ao criar compromisso para usuário ${req.usuarioId}: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  },

  async listar(req, res) {
    try {
      const compromissos = await Compromisso.find({ idUsuario: req.usuarioId });

      LogService.logInfo(`Listagem de compromissos realizada para usuário ${req.usuarioId}`);

      res.json(compromissos);
    } catch (erro) {
      LogService.logErro(`Erro ao listar compromissos para usuário ${req.usuarioId}: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  },

  async buscarPorDia(req, res) {
    try {
      const { data } = req.query;
      const inicioDia = new Date(data);
      inicioDia.setHours(0, 0, 0, 0);
      const fimDia = new Date(data);
      fimDia.setHours(23, 59, 59, 999);

      const compromissos = await Compromisso.find({
        idUsuario: req.usuarioId,
        dataHoraInicio: { $gte: inicioDia, $lte: fimDia }
      });

      LogService.logInfo(`Busca por dia realizada para usuário ${req.usuarioId} - Data: ${data}`);

      res.json(compromissos);
    } catch (erro) {
      LogService.logErro(`Erro na busca por dia para usuário ${req.usuarioId}: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  },

  async buscarPorPeriodo(req, res) {
    try {
      const { inicio, fim } = req.query;

      const compromissos = await Compromisso.find({
        idUsuario: req.usuarioId,
        dataHoraInicio: { $gte: new Date(inicio), $lte: new Date(fim) }
      });

      LogService.logInfo(`Busca por período realizada para usuário ${req.usuarioId} - De: ${inicio} até ${fim}`);

      res.json(compromissos);
    } catch (erro) {
      LogService.logErro(`Erro na busca por período para usuário ${req.usuarioId}: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  },

  async buscarPorNome(req, res) {
    try {
      const { termo } = req.query;

      const compromissos = await Compromisso.find({
        idUsuario: req.usuarioId,
        titulo: { $regex: termo, $options: 'i' }
      });

      LogService.logInfo(`Busca por nome realizada para usuário ${req.usuarioId} - Termo: "${termo}"`);

      res.json(compromissos);
    } catch (erro) {
      LogService.logErro(`Erro na busca por nome para usuário ${req.usuarioId}: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  },

  async buscarPorMes(req, res) {
    try {
      const { ano, mes } = req.query;

      const inicioMes = new Date(ano, mes - 1, 1);
      const fimMes = new Date(ano, mes, 0, 23, 59, 59, 999);

      const compromissos = await Compromisso.find({
        idUsuario: req.usuarioId,
        dataHoraInicio: { $gte: inicioMes, $lte: fimMes }
      });

      LogService.logInfo(`Busca por mês realizada para usuário ${req.usuarioId} - Ano: ${ano}, Mês: ${mes}`);

      res.json(compromissos);
    } catch (erro) {
      LogService.logErro(`Erro na busca por mês para usuário ${req.usuarioId}: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  }
};
