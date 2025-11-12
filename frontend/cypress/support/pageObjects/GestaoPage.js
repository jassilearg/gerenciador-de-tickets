class GestaoPage {
    tituloInput() { return cy.get('#titulo'); }
    descricaoInput() { return cy.get('#descricao'); }
    tipoClienteSelect() { return cy.get('#tipo-cliente'); }
    botaoSubmit() { return cy.get('#botao-submit'); }
    processarFilaButton() { return cy.get('#processar-fila'); }

    filaPendente() { return cy.get('h2').contains('Fila Pendente').parent().find('ul'); }
    filaClassificada() { return cy.get('h2').contains('Fila Classificada').parent().find('ul'); }

    criarTicket(titulo, descricao, tipo) {
        this.tituloInput().clear().type(titulo);
        this.descricaoInput().clear().type(descricao);
        this.tipoClienteSelect().select(tipo);
        this.botaoSubmit().click();
        cy.contains('Ticket criado com sucesso!').should('be.visible');
    }

    processarFila() {
        this.processarFilaButton().click();
        cy.contains('tickets processados').should('be.visible');
    }

    verificarFilaPendente(descricao) {
        this.filaPendente().contains(descricao).should('exist');
    }

    verificarFilaClassificada(descricao, urgencia) {
        this.filaClassificada().contains(descricao).parent()
            .contains(`Urgência: ${urgencia}`).should('exist');
    }
}

export default GestaoPage;
