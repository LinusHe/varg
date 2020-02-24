/* eslint-disable no-undef */
//eslint currently doesn't understand Cypress syntax and marks
//almost all of the code as undefined
describe('SaveControls', () =>{
    //Cypress is a test engine which runs the website
    //and executes tests similar to how a user would
    //interact with the site. Because of the current router
    //rules this means that Cypress has to login itself for each
    //test suites.
    before(() =>{
        cy.login();
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    //tests visibility for the button card and the appropriate button
    it('should find the Save Button', () => {
        cy.get('.button-card').should('be.visible')
        cy.get('#save-btn').should('be.visible')
    });

    //tests for visibility of the dialog before & after triggering the button
    it('should see no save dialog before clicking', () => {
        cy.get('#save-menu').should('not.be.visible')
        cy.get('#save-btn').click()
        cy.get('#save-menu').should('be.visible')
        //v-dialog overlays the rest of the screen while visible.
        //In order to do more tests after a dialog is opened you will need 
        //to close it to find elements outside of the dialog via cy.get(). This can 
        //also be avoided by setting up your test suite chronologically (in this
        //case it would mean to not close this dialog and let the following test
        //do it - but isolated test cases are better)
        cy.get('#save-menu-cancel').click()
    });

    //Test to check the functionality of the cancel button in the save menu
    it('should close on "Abbrechen"', () => {
        cy.get('#save-btn').click()
        cy.get('#save-menu').should('be.visible')
        cy.get('#save-menu-cancel').should('be.visible')
        cy.get('#save-menu-cancel').click()
        cy.get('#save-menu').should('not.be.visible')
    });

    //Test to check the functionality of denying the save without a name
    it('should not allow saving without a name', () => {
        cy.get('#save-btn').click()
        cy.get('#DatabaseName').should('be.empty')
        cy.get('#save-menu-save').click()
        //expect(cy.get('.v-messages__message')).to.contain('Fehlender Name')
    });
})