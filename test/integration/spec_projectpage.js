let accesstoken;

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
  cy.viewport(1920, 1000);
  cy.visit("/projects/1", {
    onBeforeLoad(win) {
      // and before the page finishes loading
      // set the feathers-jwt object in local storage
      win.localStorage.setItem("feathers-jwt", accesstoken);
    },
  });
});

describe("The project page", () => {
  function moveBlockfromToolbox(primitive_name, x, y) {
    cy.get(`[data-id="${primitive_name}"]`)
      .trigger("mousedown", { button: 0, force: true })
      .trigger("mousemove", { clientX: x, clientY: y, force: true });

    cy.get(".blocklyDragging.blocklySelected").as("newBlockId");

    cy.get("@newBlockId")
      .trigger("mousemove", { clientX: x, clientY: y, force: true })
      .trigger("mouseup", { force: true });
  }

  it("should load the correct project", () => {
    cy.get(".gui-header > .title > input").should("have.value", "Project 1");
  });

  it("should show a green save indicator", () => {
    cy.get(".savestatus-container > svg")
      .its("fill")
      .should("be", "darkseagreen");
  });

  it("should show an orange save indicator when code is changed, which should then change back to green after 30 seconds", () => {
    moveBlockfromToolbox("event_onprojectstart", 700, 300);
    cy.get(".savestatus-container > svg")
      .its("fill")
      .should("be", "darkorange");
    cy.wait(30 * 1000);
    cy.get(".savestatus-container > svg")
      .its("fill")
      .should("be", "darkseagreen");
  });

  it("should save the project when user navigates away (by clicking)", () => {
    moveBlockfromToolbox("control_repeat", 700, 400);
    cy.get("@newBlockId").invoke("data", "id").as("blockid");
    cy.get("nav.navbar > a").click();
    cy.get("#projectListItem-1 a").click();
    cy.get("@blockid").then((blockid) => {
      cy.get(`[data-id="${blockid}"]`);
    });
  });

  it("should save the project title when edited", () => {
    const newTitle = "Project 1 (new title)";
    cy.get(".gui-header > .title > input").clear().type(newTitle).blur();
    cy.get(".gui-header > .title > input").should("have.value", newTitle);
    cy.get("nav.navbar > a").click();
    cy.contains("#projectListItem-1 .card-title div", newTitle);
    cy.get("#projectListItem-1 a").click();
    cy.get(".gui-header > .title > input").should("have.value", newTitle);
  });

});
