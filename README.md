# Sistema de Gestão de Tickets

## Descrição do Projeto
Este projeto consiste em uma aplicação web para **gestão de tickets**, com frontend em **React** e backend em **Node.js (JavaScript)**.  
O sistema permite criar tickets de diferentes tipos (GRATUITO, BÁSICO e PREMIUM), processar filas de tickets e calcular automaticamente a urgência/SLA com base na regra de negócio definida.

---

## Tecnologias Utilizadas
- **Frontend:** React
- **Backend:** Node.js / Express
- **Banco de Dados:** PostgreSQL
- **Testes Unitários:** Jest
- **Testes E2E:** Cypress
- **Controle de Versão:** Git / GitHub

---

## Estrutura do Projeto
- frontend/
- backend/
- frontend/cypress - Testes e2e
- backend/tests - Testes unitários (Jest)
- docs/ - Documentação em Gherkin e plano de testes

---

## Requisitos do Sistema

- [x] RQNF1: Sistema desenvolvido em JavaScript orientado a objetos, com PostgreSQL.
- [x] RQNF2: Cálculo de urgência/SLA possui cobertura de testes unitários (Jest).
- [X] RQNF3: Backend retorna códigos HTTP adequados para cada resposta.
- [x] RQNF4: Frontend trata erros e apresenta feedback amigável ao usuário.
- [x] RQNF5: Este README documenta o projeto, decisões tomadas e instruções de execução.
- [x] RQNF6: Testes e2e implementados com Cypress.
- [x] RQNF7: Especificações de uso escritas em Gherkin (arquivo: `docs/specs.feature`).
- [x] RQNF8: Plano de testes criado (`docs/plano_de_testes.md`) com estratégias e prioridades.
- [x] RQNF9: Plano de testes indica testes de **caixa branca** (unitários Jest) e **caixa preta** (E2E Cypress).
- [x] RQNF10: Categorias de testes especificadas no plano de testes.
- [x] RQNF11: Relatório de bug identificado manualmente incluído neste README.


---

## Instalação e Execução

### Requisitos
- Node.js >= 20
- PostgreSQL

### Passos
1. Clone o repositório:

` git clone <URL_DO_REPOSITORIO>`\
` cd <PASTA_DO_PROJETO>`

2. Instale as dependências do backend:

`cd backend`\
`npm install`

3. Instale as dependências do frontend:

`cd frontend`\
`npm install`

4. Configure o banco de dados PostgreSQL:

Crie um banco chamado tickets_db

Configure .env com as credenciais

5. Executar localmente:

 - Backend\
`cd backend`\
`npm start`

- Frontend\
`cd ../frontend`\
`npm run dev`

## Testes
### Testes Unitários (Caixa Branca)

- Framework: Jest

- Localização: backend/tests/

- Cobertura: cálculo de urgência/SLA, funções auxiliares

### Testes E2E (Caixa Preta)

- Framework: Cypress

- Localização: cypress/e2e/

- Cobertura: criação de tickets, processamento de fila, verificação de listas e feedbacks de usuário

## Plano de Testes

- Arquivo: docs/plano_de_testes.md

- Estratégia: testar primeiro funções críticas de negócio, seguido de fluxo E2E completo.

- Prioridades: tickets PREMIUM e BASICO, palavras-chave críticas (ex.: "parado", "lento

## Especificações de Uso (Gherkin)

- Arquivo: docs/specs.feature


## Possibilidades de Melhoria

- Adicionar testes de integração backend.

- Implementar autenticação de usuários.

- Melhorar tratamento de erros do frontend para diferentes códigos HTTP.

- Adicionar relatórios visuais de SLA no frontend.

- Separar frontend e backend em contêineres Docker distintos para maior escalabilidade.

## Bugs Identificados

Bug manual: ao criar um ticket BASICO sem descrição, o frontend exibe mensagem de erro, mas não impede a submissão do formulário se outros campos estiverem preenchidos.