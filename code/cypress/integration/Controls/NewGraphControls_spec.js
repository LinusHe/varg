/* eslint-disable no-undef */
describe('NewGraphControls', () =>{
    
    before(() =>{
        cy.login();
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    it('should find the newGraph button', () => {
        cy.get('.button-card').should('be.visible')
        cy.get('#newgraph-btn').should('be.visible')
    });

    it('should show the NewGraph menu', () => {
        cy.get('#newgraph-menu').should('not.be.visible')
        cy.get('#newgraph-btn').click()
        cy.get('#newgraph-menu').should('be.visible')
    });

    //test case to close the dialog, "Abbrechen"-button
    it('should close the menu', () => {
        cy.get('#newgraph-menu-cancel').should('be.visible')
        cy.get('#newgraph-menu-cancel').click()
    });

    //test case for "Verwerfen"-button
    it('should reroute on discard', () => {
        cy.server() //not sure if this is cy.serer() used correctly ¯\_(ツ)_/¯
        cy.get('#newgraph-btn').click()
        cy.get('#newgraph-menu').should('be.visible')
        cy.get('#newgraph-menu-discard').should('be.visible')
        cy.get('#newgraph-menu-discard').click()
        //rerouting to create new graph
        expect(cy.route("http://localhost:8080/home/menu"))
        //get back to the main page
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    //test case for save-btn
    it('should show the save menu on save-btn', () => {
        cy.get('#newgraph-btn').click() //this should never be in the final test !
        cy.get('#newgraph-btn').click() //this is because of the bug concerning the toolbar
        cy.get('#newgraph-menu').should('be.visible')
        cy.get('#newgraph-menu-save').should('be.visible')
        cy.get('#newgraph-menu-save').click()
        cy.get('#save-menu').should('be.visible')
        cy.get('#save-menu-cancel').click()
        cy.get('#save-menu').should('not.be.visible')
    });
    //testing of the save menu doesn't need be in this test suite
    //tests save-btn for rerouting
    it('should reroute on correct save', () => {
        cy.server()
        cy.get('#newgraph-menu-save').click()
        cy.get('#DatabaseName').type("Hexagon")
        cy.get('#save-menu-save').click()
        //rerouting to create new graph
        expect(cy.route("http://localhost:8080/home/menu"))
        //get back to the main page
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    //test rewrite on correct overwrite
    it('should reroute on overwrite', () => {
        cy.server()
        cy.get('#save-btn').click()
        cy.get('#save-btn').click()
        cy.get('#DatabaseName').type("Hexagon")
        cy.get('#save-menu-save').click()
        cy.get('#newgraph-btn').click()
        cy.get('#newgraph-menu-save').click()
        cy.get('#DatabaseName').type("Hexagon")
        cy.get('#save-menu-save').click()
        cy.get('#save-menu-save > .v-btn__content').contains("Überschreiben")
        cy.get('#save-menu-save').click()
        expect(cy.route("http://localhost:8080/home/menu"))
        //get back to the main page
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    //canceling the save menu should still show the newgraph-menu
    it('should still show newgraph-menu when cancelling the save menu', () => {
        cy.get('#newgraph-btn').click()
        cy.get('#newgraph-btn').click()
        cy.get('#newgraph-menu-save').click()
        cy.get('#save-menu').should('be.visible')
        cy.get('#save-menu-cancel').click()
        cy.get('#newgraph-menu').should('be.visible')
    });
});