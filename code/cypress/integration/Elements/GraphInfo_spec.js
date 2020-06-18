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
    cy.get('#header-prodName > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('be.visible');

    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').click();
    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('be.visible');
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

  it('should disable prodName submit button and show UI alert when trying to save invalid form value', () => {
    // invalid case 1: prodName = empty
    cy.get('#header-prodName > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodName > form input').clear();
    cy.get('#header-prodName > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
    cy.get('#header-prodName > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
    cy.get('#header-prodName > form input').type('{enter}');
    cy.get('#varg-dialog > div > div > div > p').contains('Produktname nicht geändert: Bitte Namen eingeben');
    cy.get('#varg-dialog > div > div > div > button > span').contains('Schließen').click();
    cy.get('#varg-dialog').should('not.be.visible');
    // invalid case 2: prodName.length > 25
    cy.get('#header-prodName > form input').type('More than 25 characters (28)');
    cy.get('#header-prodName > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
    cy.get('#header-prodName > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
    cy.get('#header-prodName > form input').type('{enter}');
    cy.get('#varg-dialog > div > div > div > p').contains('Produktname nicht geändert: Bitte Namen mit maximal 25 Zeichen eingeben');
    cy.get('#varg-dialog > div > div > div > button > span').contains('Schließen').click();
    cy.get('#varg-dialog').should('not.be.visible');
  });

  it('should disable prodQuant submit button and show UI alert when trying to save invalid form value', () => {
    // invalid case 1: prodQuant = empty
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodQuant > form input').clear();
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
    cy.get('#header-prodQuant > form input').type('{enter}');
    cy.get('#varg-dialog > div > div > div > p').contains('Stückzahl nicht geändert: Bitte Stückzahl eingeben');
    cy.get('#varg-dialog > div > div > div > button > span').contains('Schließen').click();
    cy.get('#varg-dialog').should('not.be.visible');
    // invalid case 2: prodQuant < 1
    let i1 = '-999999999999999999999999';
    do {
      cy.get('#header-prodQuant > form input').clear();
      cy.get('#header-prodQuant > form input').type(i1);
      cy.get('#header-prodQuant > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
      cy.get('#header-prodQuant > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
      cy.get('#header-prodQuant > form input').type('{enter}');
      cy.get('#varg-dialog > div > div > div > p').contains('Stückzahl nicht geändert: Es sind nur positive Stückzahlen erlaubt');
      cy.get('#varg-dialog > div > div > div > button > span').contains('Schließen').click();
      cy.get('#varg-dialog').should('not.be.visible');
      switch (i1) {
        case '-999999999999999999999999': i1 = '-1'; break;
        case '-1': i1 = '-0'; break;
        case '-0': i1 = '0'; break;
        case '0': i1 = 'end'; break;
      }
    } while (i1 !== 'end');
    // invalid case 3: prodQuant >= 9999999999999999
    let i2 = '9999999999999999';
    do {
      cy.get('#header-prodQuant > form input').clear();
      cy.get('#header-prodQuant > form input').type(i2);
      cy.get('#header-prodQuant > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
      cy.get('#header-prodQuant > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
      cy.get('#header-prodQuant > form input').type('{enter}');
      cy.get('#varg-dialog > div > div > div > p').contains('Stückzahl nicht geändert: Stückzahl ist zu groß');
      cy.get('#varg-dialog > div > div > div > button > span').contains('Schließen').click();
      cy.get('#varg-dialog').should('not.be.visible');
      switch (i2) {
        case '9999999999999999': i2 = '10000000000000000'; break;
        case '10000000000000000': i2 = '76457923742587283462956877684'; break;
        case '76457923742587283462956877684': i2 = 'end'; break;
      }
    } while (i2 !== 'end');
    // invalid case 4: prodQuant = NaN
    cy.get('#header-prodQuant > form input').clear();
    cy.get('#header-prodQuant > form input').type('12A34 NaN5     6(=§/$7');
    cy.get('#header-prodQuant > form input').should('have.value','1234567');
    cy.get('#header-prodQuant > form input').clear();
    cy.get('#header-prodQuant > form input').type('--23');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
    // invalid case 5: prodQuant = float
    cy.get('#header-prodQuant > form input').clear();
    cy.get('#header-prodQuant > form input').type('1.2');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
    cy.get('#header-prodQuant > form input').type('{enter}');
    cy.get('#varg-dialog > div > div > div > p').contains('Stückzahl nicht geändert: Stückzahl muss ganzzahlig sein');
    cy.get('#varg-dialog > div > div > div > button > span').contains('Schließen').click();
    cy.get('#varg-dialog').should('not.be.visible');
    cy.get('#header-prodQuant > form input').clear();
    cy.get('#header-prodQuant > form input').type('3563,927');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]:not([class~="v-icon--disabled"])').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"][class~="v-icon--disabled"]').should('be.visible');
    cy.get('#header-prodQuant > form input').type('{enter}');
    cy.get('#varg-dialog > div > div > div > p').contains('Stückzahl nicht geändert: Stückzahl muss ganzzahlig sein');
    cy.get('#varg-dialog > div > div > div > button > span').contains('Schließen').click();
    cy.get('#varg-dialog').should('not.be.visible');
  });

  it('should save permitted prodName form value and update spans and button state back to !isEditing', () => {
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
  });

  it('should save permitted prodQuant form value and update spans and button state back to !isEditing', () => {
    let prodQuantInput = '464250';
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

    prodQuantInput = '00023';
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').click();
    cy.get('#header-prodQuant > form input').clear().type(prodQuantInput);
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').click();

    // catching target.is error -> must fix in source code
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });

    cy.get('#header-prodQuant > form input').should('not.be.visible');
    cy.get('#header-prodQuant > span').contains(+prodQuantInput);
    cy.get('#header-prodQuant > i[class~="mdi-check-bold"]').should('not.be.visible');
    cy.get('#header-prodQuant > i[class~="mdi-pencil"]').should('be.visible');
  });

});
