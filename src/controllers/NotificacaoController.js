const Notificacao = require('../models/Notificacao');
const LogService = require('../services/LogService');

module.exports = {
  async listarPendentes(req, res) {
    try {
      const notificacoes = await Notificacao.find({ statusEnvio: 'PENDENTE' });

      LogService.logInfo(`Listagem de notificações pendentes realizada`);

      res.json(notificacoes);
    } catch (erro) {
      LogService.logErro(`Erro ao listar notificações pendentes: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  },

  async enviar(req, res) {
    try {
      const { id } = req.params;
      const notificacao = await Notificacao.findById(id);
      if (!notificacao) {
        LogService.logErro(`Tentativa de envio de notificação com ID inválido: ${id}`);
        return res.status(404).json({ erro: 'Notificação não encontrada' });
      }

      // Simula envio
      notificacao.statusEnvio = 'ENVIADA';
      await notificacao.save();

      LogService.logInfo(`Notificação enviada com sucesso. ID: ${id}`);

      res.json(notificacao);
    } catch (erro) {
      LogService.logErro(`Erro ao enviar notificação com ID ${req.params.id}: ${erro.message}`);
      res.status(400).json({ erro: erro.message });
    }
  }
};
