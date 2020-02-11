describe('Zooming', () =>{
    before(() =>{
        cy.login();
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    it('should find the zoom buttons', () => {
        cy.get('#zoom-view-all').click()
        cy.get('#zoom-plus').click()
        cy.get('#zoom-minus').click()
    });
})