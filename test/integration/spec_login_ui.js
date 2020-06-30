describe("The app", () => {
  it("should redirect and show a login prompt when '/' is accessed", () => {
    cy.visit("/");
    cy.url().should("match", /login/);
    cy.contains("Please log in");
  });

  it("should show an error for incorrect log in attempt", () => {
    cy.get("#username").type("incorrectuser");
    cy.get("#password").type("incorrectpass");
    cy.get("#submit").click();

    cy.url().should("match", /login/);
    cy.contains(".alert-danger", "Invalid login");
  });

  it("should allow successful login,  login should persist on refresh, and log out should be allowed", () => {
    cy.get("#username").clear().type("demo-user");
    cy.get("#password").clear().type("secret");
    cy.get("#submit").click();

    cy.url().should("match", /\//);
    cy.contains("Your projects");

    cy.reload();
    cy.url().should("match", /\//);
    cy.contains("Your projects");

    cy.get("a#navDropDown").click();
    cy.get("a#navLogoutLink").click();
    cy.url().should("match", /login/);
    cy.contains("Please log in");
  });
});
