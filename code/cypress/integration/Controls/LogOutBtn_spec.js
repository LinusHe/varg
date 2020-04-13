/* eslint-disable no-undef */
describe('Logout-Button', () =>{
    
    before(() =>{
        cy.login();
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    it('should find the Log-Out button', () => {
        cy.get('#logout-btn').should('be.visible')
    })

    //should include some kind of check of the status of the store/cookie
    it('should reroute after clicking the button', () => {
        cy.server()
        cy.get('#logout-btn').click()
        expect(cy.route("http://localhost:8080/home/login"))
    })
})