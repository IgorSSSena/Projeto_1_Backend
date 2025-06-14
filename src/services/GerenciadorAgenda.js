
const Compromisso = require('../models/Compromisso');
const Notificacao = require('../models/Notificacao');

class GerenciadorAgenda {
  static async criarCompromisso(usuarioId, dadosCompromisso) {
    const conflito = await Compromisso.findOne({
      idUsuario: usuarioId,
      $or: [
        { dataHoraInicio: { $lt: dadosCompromisso.dataHoraFim, $gte: dadosCompromisso.dataHoraInicio } },
        { dataHoraFim: { $gt: dadosCompromisso.dataHoraInicio, $lte: dadosCompromisso.dataHoraFim } }
      ]
    });

    if (conflito) {
      throw new Error('Já existe um compromisso neste horário.');
    }

    const compromisso = await Compromisso.create({ ...dadosCompromisso, idUsuario: usuarioId });

    return compromisso;
  }
}

module.exports = GerenciadorAgenda;
