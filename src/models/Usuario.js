
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senhaHash: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
  atualizadoEm: { type: Date, default: Date.now }
});

// Método para validar senha
UsuarioSchema.methods.validarSenha = function(senha) {
  return bcrypt.compareSync(senha, this.senhaHash);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
