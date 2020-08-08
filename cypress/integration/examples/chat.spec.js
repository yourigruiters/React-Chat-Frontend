describe("chatpage tests", () => {
  it("chatpage should link away if no user", () => {
    cy.visit("/chatroom");

    cy.url().should("eq", "http://localhost:8080/?warning=no-user");
  });

  it("Chatpage should be reached through homepage", () => {
    cy.visit("/").get("[data-cyid=homepage-button]").click();

    cy.url().should("include", "chatroom");
  });

  it("Chatpage should disconnect on button", () => {
    cy.visit("/").get("[data-cyid=homepage-button]").click();

    cy.get("[data-cyid=chatpage-disconnect]").click();

    cy.url().should("eq", "http://localhost:8080/");
  });

  it("Shows a single online user", () => {
    cy.visit("/");

    cy.get("[data-cyid=homepage-button]").click();

    cy.wait(2500);

    cy.get("[data-cyid=chatpage-online]").should(
      "have.text",
      "Online users - 1"
    );
  });

  it("Shows warning when name is empty", () => {
    cy.visit("/");

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
