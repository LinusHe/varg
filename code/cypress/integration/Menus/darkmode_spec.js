/* eslint-disable no-undef */
describe("Settings", () => {
  beforeEach(() => {
    cy.login();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  it("darkmode stays active upon reloading the page", () => {
    cy.get("#SettingsBtn").click();
    cy.get("#settings-tab-main").click();
    cy.get("#settings-tab-main").should("have.class", "v-tab--active");
    cy.get(".darkmodetoggle .v-input--selection-controls__ripple").click();
    cy.reload();
    cy.get(".darkmode--activated").should("be.visible");
  });
});