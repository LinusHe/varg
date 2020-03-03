/* eslint-disable no-undef */
describe('Database-Button', () =>{

    before(() =>{
        cy.login();
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    it('should find the button', () => {
        cy.get('#database-btn').should('be.visible')
    })

    it('should reroute on btn trigger', () => {
        cy.server()
        cy.get('#database-btn').click()
        expect(cy.route('http://localhost:8080/database'))
    })

    //seperate test for database site ?
})