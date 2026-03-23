/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro no Hub de leitura', () => {

    beforeEach(() => {
        cy.visit('register.html')
    });

    it('Deve fazer cadastro com sucesso, usando função do JavaScript', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Alex Mariano')
        cy.get('#email').type(email)
        cy.get('#phone').type('31987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso, usando Faker(que é uma biblioteca)', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('31987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });

    //Proposta de implementação de novos de teste

    it('Deve validar erro quando as senhas não coincidem', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('31987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('SenhaDiferente@321') // Senha errada propositalmente
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()  
        // Resultado esperado: a URL não deve mudar para dashboard e deve haver um alerta
        cy.url().should('include', 'register')
        cy.get(':nth-child(5) > .invalid-feedback').should('contain', 'Senhas não coincidem') 
    });

    it('Deve impedir o cadastro se os termos de uso não forem aceitos', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('31987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        // Pulei o cy.get('#terms-agreement').check() propositalmente
        cy.get('#register-btn').click()
        cy.get('.form-check-label').should('contain', 'termos') 
    });
});