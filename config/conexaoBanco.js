
const mongoose = require('mongoose');

async function conectar() {
    try {
        await mongoose.connect('mongodb://localhost:27017/agenda', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB conectado com sucesso');
    } catch (erro) {
        console.error('Erro ao conectar no MongoDB:', erro);
    }
}

module.exports = conectar;
