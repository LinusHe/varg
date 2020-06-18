/* eslint-disable no-undef */
describe("Settings", () => {
    beforeEach(() => {
      cy.login();
      cy.get("#newGraph").click();
      cy.get("#prodname").type("Testprodukt");
      cy.get("#prodquantity").type("1000");
      cy.get(".btn-creategraph").click();
    });
  
    it("Basic Settings should be visible", () => {
      cy.get(".settings-dialog").should("not.be.visible");
      cy.get("#SettingsBtn").click();
      cy.get("#settings-tab-main").click();
      cy.get('.v-window-item--active > .v-card--flat > .scrolling-container > :nth-child(1)').should("be.visible");
    });
  
    it("Optimal paths should be reset after reloading", () => {
      cy.get("#SettingsBtn").click();
      cy.get("#settings-tab-main").click();
      cy.get(':nth-child(2) > .row > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
      cy.get('.v-card__actions > .grey--text > .v-btn__content').click();
      cy.reload();
      cy.login();
      cy.get("#newGraph").click();
      cy.get("#prodname").type("Testprodukt");
      cy.get("#prodquantity").type("1000");
      cy.get(".btn-creategraph").click();
      cy.get("#SettingsBtn").click();
      cy.get("#settings-tab-main").click();
      cy.get(':nth-child(2) > .row > .col-sm-2 > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
    });
  });
  