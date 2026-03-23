/// <reference types="cypress"/>

describe('Funcionalidade: Navegação da Home Page', () => {

    beforeEach(() => {
        cy.visit('index.html')
    });

    it('Deve redirecionar para a página de Cadastro ao clicar em Criar Conta Grátis', () => {
        //cy.get('[href="/register.html"]').click()
        cy.contains('Criar Conta Grátis').click() 
        cy.contains('Criar conta').click()
        cy.url().should('include', 'register')
    });

    it('Deve redirecionar para o Catálogo ao clicar em Ver Catálogo Completo', () => {
        cy.contains('Ver Catálogo Completo').click()
        cy.url().should('include', 'catalog')
    });
});