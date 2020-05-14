/* eslint-disable no-undef */
describe("Settings", () => {
  beforeEach(() => {
    cy.login();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  it("settings menu should be visible after button click", () => {
    cy.get(".settings-dialog").should("not.be.visible");
    cy.get("#SettingsBtn").click();
    cy.get(".settings-dialog").should("be.visible");
  });

  it("graph tab should be active after clicking header button", () => {
    cy.get("#SettingsBtn").click();
    cy.get("#settings-tab-graph").should("have.class", "v-tab--active");
  });

  it("optimize tab should be active after clicking optimize settings button", () => {
    cy.get("#time-open-optimize").click();
    cy.get("#settings-tab-optimize").should("have.class", "v-tab--active");
  });
});
