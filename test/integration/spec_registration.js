describe("The registration page", () => {
  it("should validate form and disallow submission for incomplete form", () => {
    cy.visit("/register");
    cy.contains("Sign up");

    cy.get("input#invitationCode").type("changeme");
    cy.get("button#submit").should("be.disabled");
    cy.get("input#username").type("testuser");
    cy.get("button#submit").should("be.disabled");
    cy.get("input#email").type("testuser@example.com");
    cy.get("button#submit").should("be.disabled");
    cy.get("input#password").type("secretpass");
    cy.get("button#submit").should("be.disabled");
    cy.get("input#password2").type("secretpas");
    cy.get("button#submit").should("be.disabled");
    cy.get("input#password2").type("s");
    cy.get("button#submit").should("not.be.disabled");
  });

  it("should validate invitation code", () => {
    cy.visit("/register");
    cy.contains("Sign up");

    cy.get("input#invitationCode").type("changeme");
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("testuser@example.com");
    cy.get("input#password").type("secretpass");
    cy.get("input#password2").type("secretpass");
    cy.get("button#submit").click();

    cy.get("div.alert").contains("Invalid invitation code");

    // Change invitation code to the valid one and try again
    cy.get("input#invitationCode").clear().type("chang3m3");
    cy.get("button#submit").click();
    cy.url().should("match", /\/$/);
    cy.get("div.container h3").contains("Your projects");
    cy.get("a#navDropDown").contains("testuser");
  });

  it("should not allow double registrations", () => {
    cy.visit("/register");
    cy.contains("Sign up");

    // Same username and email
    cy.get("input#invitationCode").type("chang3m3");
    cy.get("input#username").type("testuser");
    cy.get("input#email").type("testuser@example.com");
    cy.get("input#password").type("secretpass");
    cy.get("input#password2").type("secretpass");
    cy.get("button#submit").click();
    cy.get("div.alert").contains("Validation error");

    // Change username
    cy.get("input#username").clear().type("testuser1");
    cy.get("button#submit").click();
    cy.get("div.alert").contains("Validation error");

    // Change email
    cy.get("input#username").clear().type("testuser");
    cy.get("input#email").clear().type("testuser1@example.com");
    cy.get("button#submit").click();
    cy.get("div.alert").contains("Validation error");

    // Change both (should be successful)
    cy.get("input#username").clear().type("testuser1");
    cy.get("input#email").clear().type("testuser1@example.com");
    cy.get("button#submit").click();
    cy.get("a#navDropDown").contains("testuser1");
  });

  it("should not allow logged in users to register", () => {
    cy.visit("/login");
    cy.get("#username").clear().type("demo-user");
    cy.get("#password").clear().type("secret");
    cy.get("#submit").click();
    cy.get("a#navDropDown").contains("demo-user");

    cy.visit("/register");
    cy.url().should("match", /\/$/);

  });
});
