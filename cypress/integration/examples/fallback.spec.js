describe("Testing the Fallback page", () => {
  beforeEach(() => {
    cy.visit("/random");
  });

  it("The fallback page can be reached", () => {
    cy.get("[data-cyid=fallback-title]").should("have.text", "404 - Not found");
  });

  it("The fallback page link goes back to the homepage", () => {
    cy.get("[data-cyid=fallback-link]").click();

    cy.url().should("eq", "http://localhost:8080/");
  });
});
