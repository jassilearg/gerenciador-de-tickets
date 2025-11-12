import GestaoPage from '../support/pageObjects/GestaoPage';

describe('Testes E2E de Tickets', () => {
    const gestao = new GestaoPage();

    beforeEach(() => {
        cy.visit('http://localhost:5174/');
    });

    it('Cenário 1 - Ticket PREMIUM "parado"', () => {
        gestao.criarTicket('Ticket 1', 'parado', 'PREMIUM');
        gestao.verificarFilaPendente('parado');
        gestao.processarFila();
        gestao.verificarFilaClassificada('parado', 'CRITICA');
    });

    it('Cenário 2 - Ticket BASICO "parado"', () => {
        gestao.criarTicket('Ticket 2', 'parado', 'BASICO');
        gestao.processarFila();
        gestao.verificarFilaClassificada('parado', 'ALTA');
    });

    it('Cenário 3 - Ticket GRATUITO "lento"', () => {
        gestao.criarTicket('Ticket 3', 'lento', 'GRATUITO');
        gestao.processarFila();
        gestao.verificarFilaClassificada('lento', 'BAIXA');
    });

    it('Cenário 4 - Ticket PREMIUM "dúvida" e "não funciona"', () => {
        gestao.criarTicket('Ticket 4', 'dúvida não funciona', 'PREMIUM');
        gestao.processarFila();
        gestao.verificarFilaClassificada('dúvida não funciona', 'CRITICA');
    });

    it('Cenário 5 - Ticket BASICO sem palavras-chave', () => {
        gestao.criarTicket('Ticket 5', '', 'BASICO');
        gestao.processarFila();
        gestao.verificarFilaClassificada('', 'BAIXA');
    });

    it('Cenário 6 - Ticket PREMIUM "AJUDA"', () => {
        gestao.criarTicket('Ticket 6', 'AJUDA', 'PREMIUM');
        gestao.processarFila();
        gestao.verificarFilaClassificada('AJUDA', 'MEDIA');
    });
});
