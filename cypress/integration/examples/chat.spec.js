describe("Testing the Chatpage", () => {
  beforeEach(() => {
    cy.visit("/").get("[data-cyid=homepage-button]").click();
  });

  it("chatpage should link away if no user", () => {
    cy.visit("/chatroom");

    cy.url().should("eq", "http://localhost:8080/?warning=no-user");
  });

  it("Chatpage should be reached through homepage", () => {
    cy.url().should("include", "chatroom");
  });

  it("Chatpage should disconnect on button", () => {
    cy.get("[data-cyid=chatpage-disconnect]").click();

    cy.url().should("eq", "http://localhost:8080/");
  });

  it("Shows a single online user", () => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2500);

    cy.get("[data-cyid=chatpage-online]").should(
      "have.text",
      "Online users - 1"
    );
  });

  it("No new message if field is empty", () => {
    cy.get("[data-cyid=chatpage-input]")
      .clear()
      .get("[data-cyid=chatpage-button]")
      .click();

    cy.get("[data-cyid=chatpage-messages] > .chat__block")
      .its("length")
      .then((size) => {
        cy.get("[data-cyid=chatpage-messages] > .chat__block").should(
          "have.length",
          size
        );
      });
  });

  it("Send message if field is not empty", () => {
    cy.get("[data-cyid=chatpage-input]")
      .clear()
      .type("test message")
      .get("[data-cyid=chatpage-button]")
      .click();

    cy.get("[data-cyid=chatpage-messages] > .chat__block")
      .its("length")
      .then((size) => {
        cy.get("[data-cyid=chatpage-messages] > .chat__block").should(
          "have.length",
          size + 1
        );
      });
  });
});
