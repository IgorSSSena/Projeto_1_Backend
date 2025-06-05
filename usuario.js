const { connect } = require("./db");

class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      if (!this.nome || !this.email) {
        throw new Error("Campos obrigatórios ausentes: nome e email.");
      } else {
        const result = await db.collection("usuarios").insertOne({
          nome: this.nome,
          email: this.email,
          criadoEm: new Date(),
        });
        console.log("Usuário inserido:", result.insertedId);
        client.close();
      }
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
    }
  }
}

module.exports = Usuario;
