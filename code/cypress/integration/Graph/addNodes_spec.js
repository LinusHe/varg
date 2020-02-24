/* eslint-disable no-undef */
describe('Graph Page', () => {
    before(() => {
        // Pre-defined Login Procedure: /cypress/support/commmands.js
        // TODO: Performance Boost, User-Auth. Token direkt mitgeben, 
        //   ohne immer die Login Seite aufrufen zu müssen
        //   Siehe: https://youtu.be/5XQOK0v_YRE?t=1337
        cy.login()
        // Creates new Graph
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    it('Create Menu isnt visible at startup', () => {
        cy.get('#node-create').should('not.be.visible')
    });

    
    it('Right Click opens Create Menu', () => {
        cy.get('#cy').rightclick(100, 100)
        cy.get('.rcmenu').contains('Neuer Zustand').click()
        cy.get('#node-create').should('be.visible')
    });

    it('Close Menu by clicking outside of Menu', () => {
        cy.get('#cy').click(100,100)
        cy.get('#node-create').should('not.be.visible')
    });

});