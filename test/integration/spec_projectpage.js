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
      .trigger("pointerdown", { button: 0, force: true })
      .trigger("pointermove", { clientX: x, clientY: y, force: true });

    cy.get(".blocklyDragging.blocklySelected").as("newBlockId");

    cy.get("@newBlockId")
      .trigger("pointermove", { clientX: x, clientY: y, force: true })
      .trigger("pointerup", { force: true });
  }

  it("should load the correct project", () => {
    cy.visit("/projects/3");
    cy.get(".gui-header > .title > input").should("have.value", "Project 3");
  });

  it("should not show a save indicator initially ", () => {
    cy.get(".savestatus-container > svg").should("not.exist");
  });

  it(`should show an orange save indicator when code is changed, which should then \
    change back to green after ${Cypress.env("DATALAND_AUTOSAVE_INTERVAL")} \
    seconds`, () => {
    cy.get(".blocklyToolboxDiv #blockly-1").click();
    moveBlockfromToolbox("event_onprojectstart", 700, 300);
    cy.get(".savestatus-container > svg")
      .its("fill")
      .should("be", "darkorange");
    cy.wait(parseInt(Cypress.env("DATALAND_AUTOSAVE_INTERVAL")) * 1000);
    cy.get(".savestatus-container > svg")
      .its("fill")
      .should("be", "darkseagreen");
  });

  it("should save the project when user navigates away (by clicking)", () => {
    cy.get(".blocklyToolboxDiv #blockly-1").click();
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

  it("should not load the older project when user navigates away and loads another project", () => {
    cy.get(".blocklyToolboxDiv #blockly-1").click();
    moveBlockfromToolbox("control_repeat", 700, 400);
    cy.get("@newBlockId").invoke("data", "id").as("blockid");
    cy.get("nav.navbar > a").click();
    cy.get("#createButton").click();
    cy.get("#projectListItem-7 a").click();
    cy.get("@blockid").then((blockid) => {
      cy.get(`[data-id="${blockid}"]`).should("not.exist");
    });
  });

  it("should redirect to the not found location when a project cannot be found", () => {
    cy.visit("/projects/1000");
    cy.url().should("match", /not-found/);
    cy.contains("Not found");
  });
});
