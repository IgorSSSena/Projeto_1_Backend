const notificacoes = [];

class Notificacao {
  constructor(eventoId, mensagem, dataEnvio, visualizado) {
    this.eventoId = eventoId;
    this.mensagem = mensagem;
    this.dataEnvio = dataEnvio;
    this.visualizado = visualizado;
  }

  salvar() {
    this.id = Date.now();
    notificacoes.push(this);
    console.log('Notificação salva (memória):', this);
  }

  static listar() {
    return notificacoes;
  }
}

module.exports = Notificacao;
