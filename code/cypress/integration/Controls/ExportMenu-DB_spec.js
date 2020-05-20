/* eslint-disable no-undef */
//eslint currently doesn't understand Cypress syntax and marks
//almost all of the code as undefined
describe("Export-Menu DB", () => {
  //Cypress is a test engine which runs the website
  //and executes tests similar to how a user would
  //interact with the site. Because of the current router
  //rules this means that Cypress has to login itself for each
  //test suites.
  beforeEach(() => {
    cy.login();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  //Test to check the functionality of denying the save without a name
  it("should not allow DB saving without a name", () => {
    cy.get("#download-btn").click();
    cy.get("#tab-dbExport").click();
    cy.get("#DatabaseName").should("be.empty");
    cy.get("#save-menu-save").click();
    cy.get(".v-messages__message").should("be.visible");
    //test dependencie on the prevoius case
    cy.get("#save-menu-cancel").click();
  });

  /*TODO - CURRENTLY DISABLED due to DB now having to run in Docker for this to work
  
  //Test for save button with a given name
  it("should be able to save when given a name", () => {
    cy.get("#download-btn").click();
    cy.get("#tab-dbExport").click();
    cy.get("#DatabaseName").type("Hexagon");
    cy.get("#save-menu-save").click();
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    //maybe test if function has been called (correctly)
    cy.get("#save-menu").should("not.be.visible");
  });

  //Denies duplicate with menu
  it("should deny duplicate names", () => {
    cy.get("#download-btn").click();
    cy.get("#tab-dbExport").click();
    cy.get("#DatabaseName").type("Hexagon");
    cy.get("#save-menu-save").click();
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    cy.get("#overwriteDialog").should("be.visible");
    cy.get("#overwriteCancel").click();
    cy.get("#save-menu-cancel").click();
  });

  //Overwrite buttons works correctly
  it("should allow overwrite when given duplicate names", () => {
    cy.get("#download-btn").click();
    cy.get("#tab-dbExport").click();
    cy.get("#DatabaseName").type("Hexagon");
    cy.get("#save-menu-save").click();
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    cy.get("#overwriteDialog").should("be.visible");
    cy.get("#overwriteOK").click();
    cy.get("#export-menu").should("not.be.visible");
  });

  it("should allow to save after overwrite with different name", () => {
    cy.get("#download-btn").click();
    cy.get("#tab-dbExport").click();
    cy.get("#DatabaseName").type("Hexagon");
    cy.get("#save-menu-save").click();
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    cy.get("#overwriteDialog").should("be.visible");
    cy.get("#overwriteCancel").click();
    cy.get("#DatabaseName").clear();
    cy.get("#DatabaseName").type("Euclid");
    cy.get("#save-menu-save").click();
    cy.get("#export-menu").should("not.be.visible");
  });*/
});
