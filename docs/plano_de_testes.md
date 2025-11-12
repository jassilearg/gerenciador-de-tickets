# Plano de Testes
## 1. Objetivo

Este plano de testes tem como objetivo garantir a qualidade e estabilidade do Sistema de Gestão de Tickets, validando suas principais funcionalidades, desde a criação e processamento de tickets até o cálculo correto de urgência/SLA.
A meta é alcançar a maior cobertura possível, combinando testes unitários, de integração e end-to-end (E2E).

## 2. Escopo dos Testes

O escopo abrange:

- Frontend (React): formulários, feedbacks, e exibição de tickets.

- Backend (Node.js/Express): API de criação e processamento de tickets, cálculo de urgência e integração com o banco PostgreSQL.

- Banco de Dados: persistência e integridade dos dados.

- Fluxo E2E completo: interação do usuário pela interface, do cadastro ao processamento de tickets.

## 3. Estratégia de Testes

A estratégia adotada é baseada em risco, priorizando o que mais impacta a regra de negócio (cálculo de urgência/SLA e processamento de fila).

Estratégia a curto prazo:

- Prioridade 1: Testes unitários da lógica de cálculo de urgência (caixa branca).

- Prioridade 2: Testes E2E simulando o fluxo completo de criação e processamento de tickets (caixa preta).

- Prioridade 3: Testes manuais de usabilidade e feedback de erro.

O foco inicial é garantir que a regra de negócio crítica funcione corretamente e que o usuário tenha feedback visual adequado ao interagir com o sistema.

## 4. Tipos e Categorias de Testes
| Categoria                     | Descrição                                                     | Ferramenta       | Tipo de Caixa            | Status        |
| ----------------------------- | ------------------------------------------------------------- | ---------------- | ------------------------ | ------------- |
| **Testes Unitários**          | Validam funções isoladas do backend (ex: cálculo de urgência) | Jest             | **Caixa Branca**         |  Executados  |
| **Testes de Integração**      | Validam integração entre módulos backend e banco de dados     | Jest / Supertest | **Caixa Cinza**          |  Planejados |
| **Testes End-to-End (E2E)**   | Validam todo o fluxo do sistema via interface do usuário      | Cypress          | **Caixa Preta**          |  Executados  |
| **Testes Funcionais Manuais** | Validação de cenários críticos na UI                          | Manual           | **Caixa Preta**          |  Executados  |
| **Testes de Regressão**       | Reexecução dos testes após correções                          | Jest / Cypress   | **Caixa Branca e Preta** |  Planejados |
| **Testes de Usabilidade**     | Verificação de mensagens e feedback visual                    | Manual           | **Caixa Preta**          |  Executados  |

## 5. Ferramentas Utilizadas

- Jest: testes unitários (backend).

- Cypress: testes E2E automatizados (frontend).

- PostgreSQL: banco de dados relacional.

- GitHub Actions (opcional): execução automatizada de testes.

- Docker (diferencial): padronização do ambiente.

## 6. Ambiente de Testes

- SO: Ubuntu 22.04 LTS

- Node.js: versão 20+

- Banco de Dados: PostgreSQL

- Navegador para testes E2E: Chromium (Cypress headless mode)

## 7. Casos de Teste Principais
| ID    | Descrição                                          | Tipo                    | Resultado Esperado                           |
| ----- | -------------------------------------------------- | ----------------------- | -------------------------------------------- |
| CT-01 | Criar ticket PREMIUM com palavra "parado"          | E2E / Caixa Preta       | Ticket classificado com urgência **CRÍTICA** |
| CT-02 | Criar ticket BÁSICO com palavra "parado"           | E2E / Caixa Preta       | Urgência **ALTA**                            |
| CT-03 | Criar ticket GRATUITO com palavra "lento"          | E2E / Caixa Preta       | Urgência **BAIXA**                           |
| CT-04 | Criar ticket PREMIUM com “dúvida” e “não funciona” | E2E / Caixa Preta       | Urgência **CRÍTICA**                         |
| CT-05 | Criar ticket BÁSICO sem palavras-chave             | E2E / Caixa Preta       | Urgência **BAIXA**                           |
| CT-06 | Criar ticket PREMIUM com “AJUDA”                   | E2E / Caixa Preta       | Urgência **MÉDIA**                           |
| CT-07 | Função calcularUrgencia() recebe “parado”          | Unitário / Caixa Branca | Retorna “CRÍTICA”                            |
| CT-08 | Função calcularUrgencia() sem palavras-chave       | Unitário / Caixa Branca | Retorna “BAIXA”                              |

## 8. Critérios de Aceite

- Todos os testes unitários devem passar (Jest).

- Todos os cenários críticos E2E devem ser executados com sucesso (Cypress).

- O sistema deve exibir feedbacks claros para o usuário (mensagens, loaders).

- Nenhum erro crítico deve estar pendente no frontend ou backend.

## 9. Cobertura de Testes

- Cobertura mínima esperada: 100% das funções críticas do backend.

- Cobertura E2E: 100% dos cenários definidos no arquivo docs/specs.feature.

- Cobertura manual: validação visual de mensagens e fluxos secundários.

## 10. Conclusão

O plano garante cobertura sobre as regras de negócio críticas, feedbacks de usuário e fluxos principais de uso, priorizando a entrega funcional e confiável a curto prazo.
Testes de integração e regressão podem ser implementados futuramente para aumentar a maturidade da aplicação.
