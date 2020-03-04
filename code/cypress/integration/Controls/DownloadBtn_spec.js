/* eslint-disable no-undef */
// eslint-disable-next-line no-useless-escape
describe('Download-Button', () =>{

    

    before(() =>{
        cy.login();
        cy.get('#newGraph').click()
        cy.get('#prodname').type('Testprodukt')
        cy.get('#prodquantity').type('1000')
        cy.get('.btn-creategraph').click()
    });

    it('should find the button', () => {
        cy.get('#download-btn').should('be.visible')
    })

    it('should show the download-menu', () => {
        cy.get('#download-menu').should('not.be.visible')
        cy.get('#download-btn').click()
        cy.get('#download-menu').should('be.visible')
    })

    it('should cancel the menu', () => {
        cy.get('#download-menu-cancel').click()
        cy.get('#download-menu').should('not.be.visible')
    })

    it('should deny save without input', () => {
        cy.get('#download-btn').click()
        cy.get('#download-menu-save').click()
        cy
        .get('.col-sm-8 > .v-input > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message')
        .contains('Downloadname ist erforderlich')
    })

    it('should allow download with correct input', () => {
        cy.get('#fileName').type('Hexagon')
        cy.get('#formatselect').click({force:true}) //this is needed because v-select is masking the element
        cy.get('[aria-labelledby=".json-list-item-280"]').click()
        //doesn't work right now as I don't know how to access the object that has the method
        //would be extremely useful
       // cy.stub(downloadMenu, 'download') 
       // cy.get('#download-menu-save').click()
       // expect('download').to.be.called
       
    })
})

