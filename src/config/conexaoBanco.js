
const mongoose = require('mongoose');
require('dotenv').config();

async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Conectado ao MongoDB Atlas');
  } catch (erro) {
    console.error('❌ Erro ao conectar:', erro);
    process.exit(1);
  }
}

module.exports = conectarBanco;
