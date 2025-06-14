const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nome: String,
  compromissos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compromisso' }]
});

module.exports = mongoose.model('Agenda', AgendaSchema);
