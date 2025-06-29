
const mongoose = require('mongoose');

const notificacaoSchema = new mongoose.Schema({
    mensagem: { type: String, required: true },
    enviadaEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notificacao', notificacaoSchema);
