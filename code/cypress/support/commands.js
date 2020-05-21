/* eslint-disable no-undef */
Cypress.Commands.add("login", () => {
  cy.visit("/home/login");
  cy.get("#email").type("VarG");
  cy.get("#password").type("2020{enter}");
});

Cypress.Commands.add("createNode", (name, short, colorNum) => {
  cy.get("#dial-add-node").should("not.be.visible");
  cy.get("#dial-open > .v-btn").click();
  cy.get("#dial-add-node")
    .should("be.visible")
    .click();
  cy.get("#nodeCreateName").type(name);
  cy.get("#nodeCreateShort")
    .clear()
    .type(short);
  cy.get("#nodeCreateColor > .color-radio-" + colorNum).click();
  cy.on("uncaught:exception", (err, runnable) => {
    expect(err.message).to.include("target.is is not a function");
    return false;
  });
  cy.get("#btn-create-node > .v-btn__content").click();
});
