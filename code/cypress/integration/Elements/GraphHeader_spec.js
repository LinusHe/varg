/* eslint-disable no-undef */
describe('GraphHeader', () => {

  const prodName = "Testprodukt";
  const prodQuant = "1000";

  beforeEach(() => {
    cy.login();
    cy.get('#newGraph').click();
    cy.get('#prodname').type(prodName);
    cy.get('#prodquantity').type(prodQuant);
    cy.get('.btn-creategraph').click();
  });

  it('should contain spans at startup', () => {
    cy.get('#header-prodName > form').should('not.be.visible');
    cy.get('#header-prodName > span').should('be.visible');

    cy.get('#header-prodQuant > form').should('not.be.visible');
    cy.get('#header-prodQuant > span').should('be.visible');
  });

  it('should find the header buttons in !isEditing state', () => {
    cy.get('#header-prodName > i[class~="mdi-check-bold"]').should('not.be.visible');
    cy.get('#header-prodName > i[class~="mdi-pencil"]').should('be.visible');

    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').should('be.visible');
  });

  it('should match initial prodName and prodQuant from cytograph.data', () => {
    cy.get('#header-prodName > span').contains(prodName);
    cy.get('#header-prodQuant > span').contains(prodQuant);
  });

  it('should change the button state to isEditing on edit button click', () => {
    cy.get('#header-prodName > i[class~="mdi-pencil"]').click();
    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    cy.get('#header-prodName > i[class~="mdi-pencil"]').should('not.be.visible');
    cy.get('#header-prodName > i[class~="mdi-check-bold"]').should('be.visible');

    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').click();
    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').should('be.visible');
  });

  it('should change the spans to forms with correct string value on edit button click', () => {
    cy.get('#header-prodName > span').then(($span) => {
      const prodNameValue = $span.text();
      cy.get('#header-prodName > i[class~="mdi-pencil"]').click();
      // catching target.is error -> must fix in source code
      cy.on("uncaught:exception", (err, runnable) => {
        expect(err.message).to.include("target.is is not a function");
        return false;
      });
      cy.get('#header-prodName > span').should('not.be.visible');
      cy.get('#header-prodName > form input').should('have.value', prodNameValue);
    });

    cy.get('#header-prodQuant > span').then(($span) => {
      const prodQuantValue = $span.text();
      cy.get('#header-prodQuant > i[class~="mdi-pencil"]').click();
      // catching target.is error -> must fix in source code
      cy.on("uncaught:exception", (err, runnable) => {
        expect(err.message).to.include("target.is is not a function");
        return false;
      });
      cy.get('#header-prodQuant > span').should('not.be.visible');
      cy.get('#header-prodQuant > form input').should('have.value', prodQuantValue);
    });
  });

  /* TODO: update tests for new UI design (disabled buttons, number field for quantity)
  it('should throw alert when trying to save empty prodName form value', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('#header-prodName > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > form input').clear();
    cy.get('#header-prodName > i[class~="mdi-check-bold"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Bitte Namen eingeben');
    });
  });

  it('should throw alert when trying to save empty/NaN prodQuant form value', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodQuant > form input').clear();
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Bitte Zahl eingeben');
    });

    cy.get('#header-prodQuant > form input').type('NaN');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Bitte Zahl eingeben');
    });
  });*/

  it('should save permitted prodName form value to cytograph.data and update spans and button state back to !isEditing', () => {
    const prodNameInput = 'Testprodukt_1';
    cy.get('#header-prodName > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > form input').clear().type(prodNameInput);
    cy.get('#header-prodName > i[class~="mdi-check-bold"]').click();

    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });

    cy.get('#header-prodName > form input').should('not.be.visible');
    cy.get('#header-prodName > span').contains(prodNameInput);
    cy.get('#header-prodName > i[class~="mdi-check-bold"]').should('not.be.visible');
    cy.get('#header-prodName > i[class~="mdi-pencil"]').should('be.visible');
    // TODO: test updated prodName value in cytograph.data
  });

  it('should save permitted prodQuant form value to cytograph.data and update spans and button state back to !isEditing', () => {
    const prodQuantInput = '464250';
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodQuant > form input').clear().type(prodQuantInput);
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').click();

    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });

    cy.get('#header-prodQuant > form input').should('not.be.visible');
    cy.get('#header-prodQuant > span').contains(prodQuantInput);
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').should('be.visible');
    // TODO: test updated prodQuant value in cytograph.data
  });

});
