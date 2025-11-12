# language: pt
Funcionalidade: Gestão de Tickets
  Como um usuário do sistema de gestão de tickets
  Quero criar e processar tickets
  Para que eu possa acompanhar o atendimento conforme a urgência/SLA

  Contexto:
    Dado que estou na página principal da aplicação

  # --- Criação de Tickets ---
  Cenário: Criar ticket com todos os campos preenchidos
    Quando preencho o campo "Título" com "Erro no login"
    E preencho o campo "Descrição" com "O sistema não permite autenticação"
    E seleciono o tipo de cliente "BÁSICO"
    E clico no botão "Adicionar"
    Então devo ver a mensagem "✅ Ticket criado com sucesso!"
    E o ticket deve aparecer na lista de pendentes

  Cenário: Tentar criar ticket sem preencher todos os campos
    Quando deixo o campo "Título" em branco
    E preencho o campo "Descrição" com "Sem título"
    E clico no botão "Adicionar"
    Então devo ver a mensagem "Preencha todos os campos!"
    E o ticket não deve ser criado

  # --- Processamento de Tickets ---
  Cenário: Processar fila de tickets pendentes
    Dado que existem tickets pendentes
    Quando clico no botão "Processar Fila Pendente"
    Então devo ver a mensagem "⏳ Processando..."
    E após o processamento, devo ver "✅" indicando o total de tickets processados
    E os tickets devem aparecer na lista de classificados

  Cenário: Erro ao processar fila de tickets
    Dado que o backend retorna um erro ao processar
    Quando clico no botão "Processar Fila Pendente"
    Então devo ver a mensagem "Erro ao processar tickets."

  # --- Regra de Negócio: Cálculo de Urgência/SLA ---
  Cenário: Ticket PREMIUM com palavra "parado" deve ser crítico
    Dado que estou na tela de criação de ticket
    Quando crio um ticket do tipo "PREMIUM" com a descrição "Sistema parado há 2 horas"
    E clico em "Processar Fila Pendente"
    Então o ticket deve aparecer na lista de classificados
    E deve exibir "Urgência: CRÍTICA"

  Cenário: Ticket GRATUITO sem palavras críticas deve ter urgência normal
    Dado que crio um ticket do tipo "GRATUITO" com a descrição "Dúvida sobre funcionalidade"
    Quando clico em "Processar Fila Pendente"
    Então o ticket deve aparecer na lista de classificados
    E deve exibir "Urgência: NORMAL"
