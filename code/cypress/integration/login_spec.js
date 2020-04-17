describe("First Page", () => {
  it("Login should be first Page", () => {
    cy.visit("/");
    cy.url().should("include", "login");
  });
});

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/home/login");
  });

  it("Show user input on Login Field", () => {
    cy.get("#email")
      .type("test123")
      .should("have.value", "test123");
  });

  it("Input is clearable", () => {
    cy.get("#email").type("cleartest123");
    cy.get(".email-input .v-icon").click();
    cy.get("#email").should("have.value", "");
  });

  it("do not redirect on failed logins", () => {
    cy.get("#email").type("falscherLogin");
    cy.get("#password").type("passwort");
    cy.get(".login-button").click();
    cy.url().should("include", "login");
  });

  it("Dont Show Error Message on Startup", () => {
    // Error Message Container should be empty
    cy.get("#varg-dialog").should("be.empty");
  });

  it("Show Error Message on failed Login", () => {
    cy.get("#email").type("falscherLogin");
    cy.get("#password").type("passwort");
    cy.get(".login-button").click();
    // Error Message Container shouldnt be emptry
    cy.get("#varg-dialog").should("not.be.empty");
  });

  it("Redirect on correct Login", () => {
    cy.get("#email").type("VarG");
    cy.get("#password").type("2020");
    cy.get(".login-button").click();
    // Redirect to other Page
    cy.url().should("not.include", "login");
  });

  it("Login with Enter", () => {
    cy.get("#email").type("VarG");
    cy.get("#password").type("2020{enter}");
    // Redirect to other Page
    cy.url().should("not.include", "login");
  });
});
