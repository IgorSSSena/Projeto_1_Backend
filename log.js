const { connect } = require("./db");

class Log {
  constructor(mensagem, stackTrace, rota) {
    this.mensagem = mensagem;
    this.stackTrace = stackTrace;
    this.rota = rota;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("logs").insertOne({
        mensagem: this.mensagem,
        stackTrace: this.stackTrace,
        rota: this.rota,
        data: new Date()
      });
      console.log("Log inserido:", result.insertedId);
      client.close();
    } catch (error) {
      console.error("Erro ao inserir log:", error);
    }
  }
}

module.exports = Log;
