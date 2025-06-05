// VERSAO BASICA (app.js)
const Usuario = require("./usuario");
const Evento = require("./evento");
const Notificacao = require("./notificacao");
const Log = require("./log");

function testar() {
  console.log("🚀 Iniciando inserções (modo local em memória)...");

  // Inserir usuário
  const user = new Usuario("Gabriel Oliveira", "gabriel@email.com");
  user.salvar();
  console.log(`👤 Usuário criado:
    Nome: ${user.nome}
    Email: ${user.email}
    ID: ${user.id}`);

  // Inserir evento
  const evento = new Evento(
    "Apresentação Final",
    "Apresentação do Projeto 1 para a prof. Monique",
    new Date("2025-06-01T10:00:00Z"),
    new Date("2025-06-01T11:00:00Z"),
    user.id,
    "Sala 204"
  );
  evento.salvar();
  console.log(`📅 Evento criado:
    Título: ${evento.titulo}
    Local: ${evento.local}
    Criado para o usuário: ${user.id}`);

  // Inserir notificação
  const not = new Notificacao(
    evento.id,
    "Seu evento inicia em 30 minutos!",
    new Date(),
    false
  );
  not.salvar();
  console.log(`🔔 Notificação criada:
    Mensagem: ${not.mensagem}
    Visualizado: ${not.visualizado}`);

  // Inserir log
  const log = new Log("Evento carregado com sucesso", "sem erros", "/eventos");
  log.registrar();
  console.log(`📄 Log registrado:
    Mensagem: ${log.mensagem}
    Rota: ${log.rota}
    StackTrace: ${log.stackTrace}`);

  console.log("✅ Todas as inserções foram concluídas.");

  // Buscar eventos
  console.log("🔍 Buscando eventos no dia 01/06/2025...");

  const eventosEncontrados = Evento.buscarPorData("2025-06-01");

  if (eventosEncontrados.length > 0) {
    eventosEncontrados.forEach((ev, index) => {
      console.log(`🗓️ Evento ${index + 1}:");
      console.log(` - Título: ${ev.titulo}`);
      console.log(` - Início: ${ev.dataInicio.toLocaleString()}`);
      console.log(` - Fim: ${ev.dataFim.toLocaleString()}`);
      console.log(` - Local: ${ev.local}`);
    });
  } else {
    console.log("Nenhum evento encontrado nesta data.");
  }
}

testar();
