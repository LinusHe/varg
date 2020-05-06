/* eslint-disable no-undef */
//eslint currently doesn't understand Cypress syntax and marks
//almost all of the code as undefined
describe("Export-Menu General", () => {
  //Cypress is a test engine which runs the website
  //and executes tests similar to how a user would
  //interact with the site. Because of the current router
  //rules this means that Cypress has to login itself for each
  //test suites.
  before(() => {
    cy.login();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  //tests visibility for the button card and the appropriate button
  it("should find the Export Button", () => {
    cy.get("#download-btn").should("be.visible");
  });

  //tests for visibility of the dialog before & after triggering the button
  it("should see no save dialog before clicking", () => {
    cy.get("#export-menu").should("not.be.visible");
    cy.get("#download-btn").click();
    cy.get("#export-menu").should("be.visible");
    //v-dialog overlays the rest of the screen while visible.
    //In order to do more tests after a dialog is opened you will need
    //to close it to find elements outside of the dialog via cy.get(). This can
    //also be avoided by setting up your test suite chronologically (in this
    //case it would mean to not close this dialog and let the following test
    //do it - but isolated test cases are better)
    cy.get("#download-menu-cancel").click();
  });

  //Test to check the functionality of the cancel button in the save menu
  it('should close on "Abbrechen"', () => {
    cy.get("#download-btn").click();
    cy.get("#export-menu").should("be.visible");
    cy.get("#download-menu-cancel").should("be.visible");
    cy.get("#download-menu-cancel").click();
    cy.get("#export-menu").should("not.be.visible");
  });
});
