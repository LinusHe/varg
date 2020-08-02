/* eslint-disable no-undef */
describe("NewGraphControls", () => {
  before(() => {
    cy.homePage();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  it("should find the newGraph button", () => {
    cy.get("#newgraph-btn").should("be.visible");
  });

  it("should show the NewGraph menu", () => {
    cy.get("#newgraph-menu").should("not.be.visible");
    cy.get("#newgraph-btn").click();
    cy.get("#newgraph-menu").should("be.visible");
  });

  //test case to close the dialog, "Abbrechen"-button
  it("should close the menu", () => {
    cy.get("#newgraph-menu-cancel").should("be.visible");
    cy.get("#newgraph-menu-cancel").click();
  });

  //test case for "Verwerfen"-button
  it("should reroute on discard", () => {
    cy.server(); //not sure if this is cy.serer() used correctly ¯\_(ツ)_/¯
    cy.get("#newgraph-btn").click();
    cy.get("#newgraph-menu").should("be.visible");
    cy.get("#newgraph-menu-discard").should("be.visible");
    cy.get("#newgraph-menu-discard").click();
    //rerouting to create new graph
    expect(cy.route("http://localhost:8080/home/menu"));
    //get back to the main page
    cy.homePage();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  //test case for save-btn
  it("should show the export menu on save-btn", () => {
    cy.get("#newgraph-btn").click(); //this causes a bug with the toolbar
    cy.get("#newgraph-menu").should("be.visible");
    cy.get("#newgraph-menu-save").should("be.visible");
    cy.get("#newgraph-menu-save").click();
    cy.get("#export-menu").should("be.visible");
    cy.get("#download-menu-cancel").click();
    cy.get("#export-menu").should("not.be.visible");
  });
  //testing of the save menu doesn't need be in this test suite
  //tests save-btn for rerouting
  it("should reroute on correct local save", () => {
    cy.server();
    cy.get("#newgraph-menu-save").click();
    cy.get("#fileName").type("Hexagon");
    cy.get("[data-cy=formatselect]").type(".json{enter}", { force: true });  
    cy.get("#download-menu-save").click();
    //rerouting to create new graph
    expect(cy.route("http://localhost:8080/home/menu"));
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    //get back to the main page
    cy.homePage();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  it("should reroute on db save", () => {
    cy.server();
    cy.get("#newgraph-btn").click();
    cy.get("#newgraph-menu-save").click();
    cy.get("#tab-dbExport").click();
    cy.get("#DatabaseName").type("Hexagon");
    cy.get("#save-menu-save").click();
    //rerouting to create new graph
    expect(cy.route("http://localhost:8080/home/menu"));
    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("target.is is not a function");
      return false;
    });
    //get back to the main page
    cy.homePage();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  //canceling the save menu should still show the newgraph-menu
  it("should still show newgraph-menu when cancelling the save menu", () => {
    cy.get("#newgraph-btn").click();
    cy.get("#newgraph-menu-save").click();
    cy.get("#export-menu").should("be.visible");
    cy.get("#download-menu-cancel").click();
    cy.get("#newgraph-menu").should("be.visible");
  });
});
