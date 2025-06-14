
const mongoose = require('mongoose');

const NotificacaoSchema = new mongoose.Schema({
  idCompromisso: { type: mongoose.Schema.Types.ObjectId, ref: 'Compromisso', required: true },
  dataHoraEnvio: { type: Date, required: true },
  tipo: { type: String, enum: ['EMAIL', 'PUSH', 'SMS'], default: 'EMAIL' },
  statusEnvio: { type: String, enum: ['PENDENTE', 'ENVIADA', 'FALHA'], default: 'PENDENTE' }
});

module.exports = mongoose.model('Notificacao', NotificacaoSchema);
