 db.eventos.find().pretty()
[
  {
    _id: ObjectId('682e712614b276a5d01036f7'),
    titulo: 'Apresentação Final',
    descricao: 'Apresentação do Projeto 1 para a prof. Monique',
    dataInicio: ISODate('2025-06-01T10:00:00.000Z'),
    dataFim: ISODate('2025-06-01T11:00:00.000Z'),
    usuarioId: null,
    local: 'Sala 204',
    criadoEm: ISODate('2025-05-22T00:34:46.613Z')
  }
]
db.usuarios.findOne()
{
  _id: ObjectId('682e6ee2675b3125a4b39a02'),
  nome: 'Gabriel Oliveira',
  email: 'gabriel@email.com',
  criadoEm: ISODate('2025-05-22T00:25:06.652Z')
}
db.eventos.findOne()
 
{
  _id: ObjectId('682e712614b276a5d01036f7'),
  titulo: 'Apresentação Final',
  descricao: 'Apresentação do Projeto 1 para a prof. Monique',
  dataInicio: ISODate('2025-06-01T10:00:00.000Z'),
  dataFim: ISODate('2025-06-01T11:00:00.000Z'),
  usuarioId: null,
  local: 'Sala 204',
  criadoEm: ISODate('2025-05-22T00:34:46.613Z')
}
db.notificacoes.findOne()
{
  _id: ObjectId('682e712814b276a5d01036f8'),
  eventoId: null,
  mensagem: 'Seu evento inicia em 30 minutos!',
  dataEnvio: ISODate('2025-05-22T00:34:46.792Z'),
  visualizado: false
}
db.logs.findOne()
... 
{
  _id: ObjectId('682e6ee4675b3125a4b39a03'),
  mensagem: 'Erro ao carregar evento',
  stackTrace: 'ReferenceError: evento is not defined',
  rota: '/eventos',
  data: ISODate('2025-05-22T00:25:08.241Z')
}