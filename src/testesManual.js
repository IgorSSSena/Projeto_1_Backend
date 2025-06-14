const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: () => true // Capturar também respostas 4xx e 5xx
});

async function rodarTestes() {
  try {
    console.log('🟢 Teste: Registrar novo usuário...');
    const registro = await api.post('/usuarios/registrar', {
      nome: 'Teste Usuário',
      email: 'teste@example.com',
      senha: '12345678'
    });
    console.log('Resposta registro:', registro.status, registro.data);

    console.log('🟢 Teste: Login...');
    const loginResponse = await api.post('/usuarios/login', {
      email: 'teste@example.com',
      senha: '12345678'
    });
    console.log('Resposta login:', loginResponse.status, loginResponse.data);

    const token = loginResponse.data.token;
    if (!token) {
      console.error('❌ Token não gerado! Abortando próximos testes.');
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    console.log('🟢 Teste: Criar compromisso...');
    const criarCompromisso = await api.post('/compromissos', {
      titulo: 'Reunião de Teste',
      descricao: 'Descrição teste',
      dataHoraInicio: new Date(),
      dataHoraFim: new Date(new Date().getTime() + 3600000),
      status: 'AGENDADO'
    });
    console.log('Resposta criar compromisso:', criarCompromisso.status, criarCompromisso.data);

    console.log('🟢 Teste: Listar todos os compromissos...');
    const listar = await api.get('/compromissos');
    console.log('Resposta listar:', listar.status, listar.data);

    console.log('🟢 Teste: Buscar por dia...');
    const buscarDia = await api.get('/compromissos/dia', { params: { data: new Date().toISOString().split('T')[0] } });
    console.log('Resposta buscar por dia:', buscarDia.status, buscarDia.data);

    console.log('🟢 Teste: Buscar por período...');
    const buscarPeriodo = await api.get('/compromissos/periodo', {
      params: { inicio: '2025-01-01', fim: '2025-12-31' }
    });
    console.log('Resposta buscar por período:', buscarPeriodo.status, buscarPeriodo.data);

    console.log('🟢 Teste: Buscar por nome...');
    const buscarNome = await api.get('/compromissos/nome', { params: { termo: 'Reunião' } });
    console.log('Resposta buscar por nome:', buscarNome.status, buscarNome.data);

    console.log('🟢 Teste: Buscar por mês...');
    const buscarMes = await api.get('/compromissos/mes', { params: { ano: 2025, mes: 6 } });
    console.log('Resposta buscar por mês:', buscarMes.status, buscarMes.data);

    console.log('🟢 Teste: Listar notificações pendentes...');
    const listarNotificacoes = await api.get('/notificacoes/pendentes');
    console.log('Resposta notificações:', listarNotificacoes.status, listarNotificacoes.data);

    console.log('🟢 Teste: Forçar erro (data inválida)...');
    const erroBusca = await api.get('/compromissos/dia', { params: { data: 'data-invalida' } });
    console.log('Resposta erro forçado:', erroBusca.status, erroBusca.data);

    console.log('✅ Todos os testes rodaram.');
  } catch (erro) {
    console.error('❌ Erro inesperado nos testes:', erro.message);
  }
}

rodarTestes();
