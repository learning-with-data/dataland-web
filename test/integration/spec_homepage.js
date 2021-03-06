let accesstoken;

// Based on https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/logging-in__jwt/cypress/integration/spec.js
// Details about how to get an access token can be found at
// https://docs.feathersjs.com/api/client/rest.html#authentication
before(function fetchUser() {
  cy.request("POST", "http://localhost:3030/authentication", {
    strategy: "local",
    username: "demo-user",
    password: "secret",
  }).then((response) => {
    accesstoken = response.body.accessToken;
  });
});

beforeEach(function setUser() {
  cy.visit("/", {
    onBeforeLoad(win) {
      // and before the page finishes loading
      // set the feathers-jwt object in local storage
      win.localStorage.setItem("feathers-jwt", accesstoken);
    },
  });
});

describe("The home page", () => {
  it("makes authenticated requests with access token", () => {
    cy.contains("Your projects");
  });

  it("allows creation of new projects", () => {
    cy.get("#createButton").click();
    cy.contains(".card-title div", "Untitled project");
  });

  it("allows updating of project title and description", () => {
    const newTitle = "Project 2's new title";
    const newDescription = "Project 4 has a new description now.";

    cy.get("#projectListItem-2 .card-title div").clear().type(newTitle).blur();
    cy.contains("#projectListItem-2 .card-title div", newTitle);
    cy.reload();
    cy.contains("#projectListItem-2 .card-title div", newTitle);

    cy.get("#projectListItem-4 .card-text").clear().type(newDescription).blur();
    cy.contains("#projectListItem-4 .card-text", newDescription);
    cy.reload();
    cy.contains("#projectListItem-4 .card-text", newDescription);
  });

  it("allows shows last modified correctly", () => {
    // https://day.js.org/docs/en/display/from-now#list-of-breakdown-range
    cy.get("#projectListItem-5 .card-text")
      .clear()
      .type("New description")
      .blur();
    cy.get("#projectListItem-5 .updated-timestamp").contains(
      "a few seconds ago"
    );
  });

  it("shows an error when a database operation fails", () => {
    // TODO: We need a better version of this, potentially by mocking
    // the underlying WebSocket.
    // See https://github.com/cypress-io/cypress/issues/2492
    //
    // Currently, the database error is triggered by setting a title
    // field to longer than what is defined in the backend ORM (255 chars)
    const longTitle = "a".repeat(260);
    cy.get("#projectListItem-5 .card-title div").clear().type(longTitle).blur();

    // Error dialog shows up
    cy.get(".error-notification").contains("Whoops!");
    cy.get(".error-notification").contains("Data too long");

    // Dismiss the error
    cy.get(".error-notification .close").click();
    cy.get(".error-notification").should("not.exist");
  });
});
