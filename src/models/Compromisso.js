
const mongoose = require('mongoose');

const CompromissoSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  titulo: { type: String, required: true },
  descricao: String,
  dataHoraInicio: { type: Date, required: true },
  dataHoraFim: { type: Date, required: true },
  status: { type: String, enum: ['AGENDADO', 'CONCLUIDO', 'CANCELADO'], default: 'AGENDADO' },
  localizacao: String,
  criadoEm: { type: Date, default: Date.now },
  atualizadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Compromisso', CompromissoSchema);
