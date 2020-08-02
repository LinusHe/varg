/* eslint-disable no-undef */
// eslint-disable-next-line no-useless-escape
describe("Export-Menu Download", () => {
  before(() => {
    cy.homePage();
    cy.get("#newGraph").click();
    cy.get("#prodname").type("Testprodukt");
    cy.get("#prodquantity").type("1000");
    cy.get(".btn-creategraph").click();
  });

  it("should deny save without input", () => {
    cy.get("#download-btn").click();
    cy.get("#download-menu-save").click();
    cy.get(
      ".col-sm-8 > .v-input > .v-input__control > .v-text-field__details > .v-messages > .v-messages__wrapper > .v-messages__message"
    ).contains("Downloadname ist erforderlich");
  });

  it("should allow download with correct input", () => {
    cy.get("#fileName").type("Hexagon");
    cy.get("[data-cy=formatselect]").type(".json{enter}", { force: true });
    //data-cy=formatselect wählt die selectcomponent aus
    // .json{enter}, force:true wählt als format .json aus
    //cy.stub(downloadMenu, 'download')
    //cy.get('#download-menu-save').click()
    //expect('download').to.be.called
  });
});
