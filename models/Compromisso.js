
const mongoose = require('mongoose');

const compromissoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    data: { type: String, required: true },
    descricao: String
});

module.exports = mongoose.model('Compromisso', compromissoSchema);
