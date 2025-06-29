const fs = require('fs');
const path = require('path');

class LogService {
  static registrarLog(tipo, mensagem) {
    const dataAgora = new Date();
    const dataFormatada = dataAgora.toISOString().replace('T', ' ').substring(0, 19);

    const linhaLog = `[${dataFormatada}] - ${tipo.toUpperCase()} - ${mensagem}\n`;

    const pastaLogs = path.join(__dirname, '..', '..', 'logs');
    const nomeArquivo = `${dataAgora.toISOString().substring(0, 10)}.log`;
    const caminhoArquivo = path.join(pastaLogs, nomeArquivo);

    // Criar a pasta logs se não existir
    if (!fs.existsSync(pastaLogs)) {
      fs.mkdirSync(pastaLogs, { recursive: true });
    }

    // Escrever o log no arquivo
    fs.appendFile(caminhoArquivo, linhaLog, (erro) => {
      if (erro) {
        console.error('❌ Falha ao gravar log:', erro);
      }
    });
  }

  static logInfo(mensagem) {
    this.registrarLog('INFO', mensagem);
  }

  static logErro(mensagem) {
    this.registrarLog('ERRO', mensagem);
  }
}

module.exports = LogService;
