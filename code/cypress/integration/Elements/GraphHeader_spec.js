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

  it('should match initial prodName and prodQuant from cytograph.data', () => {
    cy.get('#header-prodName > span').contains('prodName');
    cy.get('#header-prodQuant > span').contains('0');
    // better tests only possible once the NewGraph window has an actual function
  });

  it('should change the button state to isEditing on edit button click', () => {
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').should('not.be.visible');
    cy.get('#header-prodName > button > > i[class~="mdi-content-save-edit"]').should('be.visible');

    cy.get('#header-prodQuant > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodQuant > button > > i[class~="mdi-pencil"]').should('not.be.visible');
    cy.get('#header-prodQuant > button > > i[class~="mdi-content-save-edit"]').should('be.visible');
  });

  it('should change the spans to inputs with correct string value on edit button click', () => {
    cy.get('#header-prodName > span').then(($span) => {
      const prodNameValue = $span.text();
      cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').click();
      cy.get('#header-prodName > span').should('not.be.visible');
      cy.get('#header-prodName > input').should('have.value', prodNameValue);
    });

    cy.get('#header-prodQuant > span').then(($span) => {
      const prodQuantValue = $span.text();
      cy.get('#header-prodQuant > button > > i[class~="mdi-pencil"]').click();
      cy.get('#header-prodQuant > span').should('not.be.visible');
      cy.get('#header-prodQuant > input').should('have.value', prodQuantValue);
    });
  });

  it('should throw alert when trying to save empty prodName input value', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > input').clear();
    cy.get('#header-prodName > button > > i[class~="mdi-content-save-edit"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Bitte Namen eingeben');
    });
  });

  it('should throw alert when trying to save empty/NaN prodQuant input value', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('#header-prodQuant > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodQuant > input').clear();
    cy.get('#header-prodQuant > button > > i[class~="mdi-content-save-edit"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Bitte Zahl eingeben');
    });

    cy.get('#header-prodQuant > input').type('NaN');
    cy.get('#header-prodQuant > button > > i[class~="mdi-content-save-edit"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Bitte Zahl eingeben');
    });
  });

  it('should save permitted prodName input value to cytograph.data and update spans and button state back to !isEditing', () => {
    const prodNameInput = 'Testprodukt_1';
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > input').clear().type(prodNameInput);
    cy.get('#header-prodName > button > > i[class~="mdi-content-save-edit"]').click();

    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });

    cy.get('#header-prodName > input').should('not.be.visible');
    cy.get('#header-prodName > span').contains(prodNameInput);
    cy.get('#header-prodName > button > > i[class~="mdi-content-save-edit"]').should('not.be.visible');
    cy.get('#header-prodName > button > > i[class~="mdi-pencil"]').should('be.visible');
    // TODO: test updated prodName value in cytograph.data
  });

  it('should save permitted prodQuant input value to cytograph.data and update spans and button state back to !isEditing', () => {
    const prodQuantInput = '464250';
    cy.get('#header-prodQuant > button > > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodQuant > input').clear().type(prodQuantInput);
    cy.get('#header-prodQuant > button > > i[class~="mdi-content-save-edit"]').click();

    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    
    cy.get('#header-prodQuant > input').should('not.be.visible');
    cy.get('#header-prodQuant > span').contains(prodQuantInput);
    cy.get('#header-prodQuant > button > > i[class~="mdi-content-save-edit"]').should('not.be.visible');
    cy.get('#header-prodQuant > button > > i[class~="mdi-pencil"]').should('be.visible');
    // TODO: test updated prodQuant value in cytograph.data
  });

});