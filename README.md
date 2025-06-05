# 📅 Agenda Eletrônica – Projeto 1 de Programação Web Back-End

Este é um projeto acadêmico de back-end desenvolvido em **Node.js** com banco de dados **MongoDB Atlas (nuvem)**.  
Ele simula uma agenda eletrônica (como o Google Calendar), permitindo:

- Cadastro de usuários
- Criação de eventos relacionados a usuários
- Envio de notificações sobre eventos
- Registro de logs de erros
- Busca de eventos por data (ex: mostrar o que tem marcado num dia)

---

## 👩‍🏫 Professora
**Monique Emídio de Oliveira**


## 👨‍💻 Aluno
**Igor Silva Sena RA:2418274**
**Leonardo Kiyoshi Tioda Menezes Rocha RA:**

---

## 📚 Tecnologias Utilizadas

- Node.js
- MongoDB Atlas (MongoDB em nuvem)
- Bibliotecas:
  - `mongodb` para conexão com o banco
  - `dotenv` para variáveis de ambiente

---

## 🚀 Como Rodar o Projeto (Passo a Passo)

### 🛠️ 1. Instale o Node.js

Se você **nunca usou Node.js**, siga este passo:

1. Acesse: https://nodejs.org
2. Clique na versão **LTS** (recomendada)
3. Instale normalmente
4. Após instalar, abra o terminal e digite:

```bash
node -v
npm -v
```

Se aparecerem versões (ex: `v18.17.0`), está funcionando!

---

### ☁️ 2. Crie uma Conta Gratuita no MongoDB Atlas

O MongoDB será utilizado **na nuvem**, não precisa instalar localmente.

1. Acesse: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Crie uma conta com seu e-mail
3. Crie um **cluster gratuito**
4. Vá em "Database Access" e crie um **usuário do banco** com login e senha
5. Vá em "Network Access" e **autorize o IP público** com o botão "Add IP Address" > **Allow Access from Anywhere (0.0.0.0/0)**
6. Copie a **string de conexão** (MongoDB URI), que será algo assim:

```
mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

⚠️ Copie exatamente essa string, substituindo `<usuario>`, `<senha>` e `<cluster>` com seus dados reais.

---

### 📁 3. Baixe o projeto

Se você recebeu o `.zip`:

- Extraia o conteúdo para uma pasta


---

### 📂 4. Crie o arquivo `.env`

1. Na raiz do projeto, crie um arquivo chamado **`.env`**.
2. Copie o conteúdo do arquivo `.env.example`:

```env
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

3. Substitua `<usuario>`, `<senha>` e `<cluster>` com os dados do seu banco.

---

### 📦 5. Instale as dependências

Abra o terminal dentro da pasta do projeto e rode:

```bash
npm install
```

Isso irá instalar as bibliotecas `mongodb` e `dotenv`.

---

### ▶️ 6. Execute o projeto

Ainda no terminal, execute:

```bash
node app.js
```

---

## ✅ O que o Projeto Vai Fazer

O script `app.js` executa automaticamente:

1. Criação de um **usuário**
2. Criação de um **evento** associado ao usuário
3. Criação de uma **notificação**
4. Registro de um **log**
5. Busca e exibição de **eventos por data** (ex: `2025-06-01`)

📋 Todos os dados são exibidos no terminal, formatados com clareza.

---

## 📁 Estrutura dos Arquivos

```
📁 projeto-agenda/
├── app.js                 # Script principal de testes
├── db.js                  # Conexão com o MongoDB
├── usuario.js             # Classe de usuários
├── evento.js              # Classe de eventos
├── notificacao.js         # Classe de notificações
├── log.js                 # Classe para armazenar logs de erro
├── .env                   # (criado por você) com string de conexão
├── .env.example           # Exemplo de variáveis de ambiente
├── package.json           # Lista de dependências
```

---

## 📌 Critérios Avaliados

✅ Casos de uso da Agenda Eletrônica implementados  
✅ Verificação de campos obrigatórios (ex: nome, email, datas)  
✅ Tratamento de exceções com try/catch  
✅ Armazenamento de logs de erro no MongoDB  
✅ Uso exclusivo de bibliotecas permitidas

---

