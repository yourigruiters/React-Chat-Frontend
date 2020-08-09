describe("Testing the Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("homepage runs", () => {
    cy.url().should("include", "/");
  });

  it("Goes directly to chatroom with random name", () => {
    cy.get("[data-cyid=homepage-button]").click();

    cy.url().should("include", "/chatroom");
  });

  it("Goes directly to chatroom with own name", () => {
    cy.get("[data-cyid=homepage-input]")
      .clear()
      .type("myname")
      .get("[data-cyid=homepage-button]")
      .click();

    cy.url().should("include", "/chatroom");
  });

  it("Shows change value of username", () => {
    cy.get("[data-cyid=homepage-input]")
      .clear()
      .type("testuser")
      .get("[data-cyid=homepage-username]")
      .should("have.text", "Welcome, testuser!");
  });

  it("Shows warning when name is empty", () => {
    cy.get("[data-cyid=homepage-input]")
      .clear()
      .get("[data-cyid=homepage-button]")
      .click();

    cy.get("[data-cyid=homepage-warning]").should("be.visible");
  });

  // Check API username
  it("Check API username", () => {
    cy.request("http://localhost:5000/api/user/testuser").as("APIusertest");

    cy.get("@APIusertest").should((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
