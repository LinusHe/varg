/* eslint-disable no-undef */
describe("createEdge menu", () => {
  beforeEach(() => {
    cy.login();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  it("should create two nodes and one Quick Edge", () => {
    cy.createNode("A-Knoten", "A", 3);
    cy.createNode("B-Knoten", "B", 1);
    cy.get("#zoom-view-all").click();
    // Drag and Drop doesnt work with cytoscape yet...
    // No Quick Edge will be drawn
    cy.get("#cy")
      .trigger("mousedown")
      .trigger("mousemove", 800, 300)
      .trigger("mouseup", 800, 300);
  });
});
