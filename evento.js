const { connect } = require("./db");

class Evento {
  constructor(titulo, descricao, dataInicio, dataFim, usuarioId, local) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.usuarioId = usuarioId;
    this.local = local;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("eventos").insertOne({
        titulo: this.titulo,
        descricao: this.descricao,
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        usuarioId: this.usuarioId,
        local: this.local,
        criadoEm: new Date()
      });
      console.log("Evento inserido:", result.insertedId);
      client.close();
    } catch (error) {
      console.error("Erro ao inserir evento:", error);
    }
  }
  async buscarPorIntervalo(dataInicio, dataFim) {
  try {
    const { db, client } = await connect();
    const eventos = await db.collection("eventos").find({
      dataInicio: { $gte: new Date(dataInicio) },
      dataFim: { $lte: new Date(dataFim) }
    }).toArray();
    client.close();
    return eventos;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
  }
}
async buscarPorData(data) {
  try {
    const { db, client } = await connect();

    const inicioDia = new Date(data);
    inicioDia.setHours(0, 0, 0, 0);

    const fimDia = new Date(data);
    fimDia.setHours(23, 59, 59, 999);

    const eventos = await db.collection("eventos").find({
      dataInicio: { $gte: inicioDia, $lte: fimDia }
    }).toArray();

    client.close();
    return eventos;
  } catch (error) {
    console.error("Erro ao buscar eventos por data:", error);
  }
}

}


module.exports = Evento;
