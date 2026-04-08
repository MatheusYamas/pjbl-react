# Dashboard Financeiro - Gestão de Ativos

Sistema web desenvolvido para a gestão e controle de investimentos (Ações, FIIs, BDRs e ETFs). Este projeto foi construído como requisito de avaliação da disciplina, implementando um CRUD completo com integração entre Frontend (React) e Backend (Node.js + MySQL).

**Desenvolvido por:** Matheus Yamamoto Dias

## Tecnologias Utilizadas

**Frontend:**
- React.js (com Vite)
- React Router DOM (Navegação SPA)
- Axios (Consumo de API RESTful)
- Bootstrap 5 (Estilização e UI Responsiva)

**Backend:**
- Node.js
- Express.js (Roteamento e Middlewares)
- MySQL2 (Driver de conexão e queries preparadas)
- Dotenv (Gestão de variáveis de ambiente)
- CORS

**Banco de Dados:**
- MySQL (Tabela `ativos` estruturada com ID, ticker, tipo, quantidade, preço médio e data da compra).

## Funcionalidades Implementadas

- **Create:** Cadastro de novos ativos no portfólio com validação de campos obrigatórios.
- **Read:** Listagem de todos os ativos cadastrados em formato de tabela (com suporte a paginação no backend).
- **Update:** Edição de informações de um ativo já existente.
- **Delete:** Exclusão de ativos do banco de dados com alerta de confirmação.
- **Visualização Detalhada:** Tela específica para exibir os dados completos de um único ativo, incluindo o cálculo automático do Total Investido.

---

## Como Rodar o Projeto Localmente

Siga as instruções abaixo para executar o sistema na sua máquina.

### 1. Configuração do Banco de Dados (MySQL)
1. Certifique-se de ter o MySQL (ou MariaDB) instalado e rodando.
2. Abra seu gerenciador de banco de dados (ex: DBeaver, MySQL Workbench).
3. Execute o script SQL localizado na pasta `sql` do projeto (`sql/investimentos_bd.sql`) para criar o banco de dados e a tabela necessária.

### 2. Inicializando o Backend (API)
Abra um terminal e execute os seguintes comandos:

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz suas credenciais do MySQL:
# PORT=3001
# DB_HOST=localhost
# DB_USER=root
# DB_PASS=sua_senha_aqui
# DB_NAME=gestao_ativos

# Inicie o servidor Node.js
node server.js

# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o front
npm run dev