/* eslint-disable no-undef */
//eslint currently doesn't understand Cypress syntax and marks
//almost all of the code as undefined
describe('Zooming', () =>{
    //Cypress is a test engine which runs the website
    //and executes tests similar to how a user would
    //interact with the app. Because of the current router
    //rules this means that Cypress has to login itself for each
    //test suites.
    before(() =>{
        cy.login();
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    //This test finds all the buttons intendend for zooming
    //and asserts that they should be visible 
    it('should find the zoom buttons', () => {
        expect(cy.get('#cy'))
        cy.get('#zoom-view-all').should('be.visible')
        cy.get('#zoom-plus').should('be.visible')
        cy.get('#zoom-minus').should('be.visible')
    });

    //This test triggers all the buttons in order to 
    //control their functionality. (WIP: It would be ideal 
    //to be able to access the running and mounted graph
    //and its containers data to assert that the zoom was done 
    //correctly )
    it('pressing the buttons should zoom', () => {
        expect(cy.get('#cy'))
        cy.get('#zoom-view-all').click()
        cy.get('#zoom-plus').click()
        cy.get('#zoom-minus').click()
    });
})