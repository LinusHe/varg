Cypress.Commands.add('login', () => {
    cy.visit('/home/login')
    cy.get('#email').type('VarG')
    cy.get('#password').type('2020{enter}')
})