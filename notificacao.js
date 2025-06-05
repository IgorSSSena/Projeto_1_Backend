const { connect } = require("./db");

class Notificacao {
  constructor(eventoId, mensagem, dataEnvio, visualizado) {
    this.eventoId = eventoId;
    this.mensagem = mensagem;
    this.dataEnvio = dataEnvio;
    this.visualizado = visualizado;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("notificacoes").insertOne({
        eventoId: this.eventoId,
        mensagem: this.mensagem,
        dataEnvio: this.dataEnvio,
        visualizado: this.visualizado
      });
      console.log("Notificação inserida:", result.insertedId);
      client.close();
    } catch (error) {
      console.error("Erro ao inserir notificação:", error);
    }
  }
}

module.exports = Notificacao;
