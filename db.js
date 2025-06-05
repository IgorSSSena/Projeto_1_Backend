require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
const dbName = "agendaEletronicaDB";
async function connect() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

module.exports = { connect };
