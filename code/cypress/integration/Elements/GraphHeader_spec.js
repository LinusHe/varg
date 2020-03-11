/* eslint-disable no-undef */
describe('GraphHeader', () => {

  beforeEach(() => {
    cy.login();
    cy.get('#newGraph').click();
    cy.get('#prodname').type('Testprodukt');
    cy.get('#prodquantity').type('1000');
    cy.get('.btn-creategraph').click();
  });

  it('should contain spans at startup', () => {
    cy.get('#header-prodName > input').should('not.be.visible');
    cy.get('#header-prodName > span').should('be.visible');
    cy.get('#header-prodQuant > input').should('not.be.visible');
    cy.get('#header-prodQuant > span').should('be.visible');
  });

  it('should find the header buttons in !isEditing state', () => {
    cy.get('#header-prodName > button > > i[class~="mdi-content-save-edit"]').should('not.be.visible');
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').should('be.visible');
    cy.get('#header-prodQuant > button > > i[class~="mdi-content-save-edit"]').should('not.be.visible');
    cy.get('#header-prodQuant > button > > i[class~="mdi-pencil"]').should('be.visible');
  });

  it('should match prodName and prodQuant data from the .json', () => {
    // only possible once the NewGraph window has an actual function
  });

  it('should change the button state on edit button click', () => {
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').should('not.be.visible');
    cy.get('#header-prodName > button > > i[class~="mdi-content-save-edit"]').should('be.visible');
    
  });

  it('should change the spans to inputs with correct string value on edit button click', () => {
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > span').should('not.be.visible');
    cy.get('#header-prodName > input').should('have.value', 'prodName');

  });

});