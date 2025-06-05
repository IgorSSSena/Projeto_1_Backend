const Usuario = require("./usuario");
const Evento = require("./evento");
const Notificacao = require("./notificacao");
const Log = require("./log");
const { ObjectId } = require("mongodb");

async function testar() {
  console.log("🚀 Iniciando inserções no MongoDB Atlas...");

  // Inserir usuário
  const user = new Usuario("Gabriel Oliveira", "gabriel@email.com");
  const userId = await user.inserir();
  console.log("🔑 ID bruto retornado (Usuario):", userId);
  console.log(`👤 Usuário criado com sucesso:
    Nome: ${user.nome}
    Email: ${user.email}
    ID: ${userId}
  `);

  // Inserir evento
  const evento = new Evento(
    "Apresentação Final",
    "Apresentação do Projeto 1 para a prof. Monique",
    new Date("2025-06-01T10:00:00Z"),
    new Date("2025-06-01T11:00:00Z"),
    userId,
    "Sala 204"
  );
  const eventoId = await evento.inserir();
  console.log("🔑 ID bruto retornado (Evento):", eventoId);
  console.log(`📅 Evento criado com sucesso:
    Título: ${evento.titulo}
    Local: ${evento.local}
    Criado para o usuário: ${userId}
    ID: ${eventoId}
  `);

  // Inserir notificação
  const not = new Notificacao(eventoId, "Seu evento inicia em 30 minutos!", new Date(), false);
  const notId = await not.inserir();
  console.log("🔑 ID bruto retornado (Notificação):", notId);
  console.log(`🔔 Notificação criada:
    Mensagem: ${not.mensagem}
    Visualizado: ${not.visualizado}
    Evento relacionado: ${eventoId}
  `);

  // Inserir log
  const log = new Log("Evento carregado com sucesso", "sem erros", "/eventos");
  const logId = await log.inserir();
  console.log("🔑 ID bruto retornado (Log):", logId);
  console.log(`📄 Log registrado:
    Mensagem: ${log.mensagem}
    Rota: ${log.rota}
    StackTrace: ${log.stackTrace}
  `);

  console.log("✅ Todas as inserções foram concluídas.");

  // TESTE: Buscar eventos do dia 01/06/2025
console.log("🔍 Buscando eventos no dia 01/06/2025...");

const buscaEvento = new Evento(); // não precisa de parâmetros para buscar
const eventosEncontrados = await buscaEvento.buscarPorData("2025-06-01");

if (eventosEncontrados.length > 0) {
  eventosEncontrados.forEach((ev, index) => {
    console.log(`🗓️ Evento ${index + 1}:`);
    console.log(` - Título: ${ev.titulo}`);
    console.log(` - Início: ${new Date(ev.dataInicio).toLocaleString()}`);
    console.log(` - Fim: ${new Date(ev.dataFim).toLocaleString()}`);
    console.log(` - Local: ${ev.local}`);
  });
} else {
  console.log("Nenhum evento encontrado nesta data.");
}

}

testar();
