describe("Fallback tests", () => {
  it("Fallback runs", () => {
    cy.visit("/asdgas");

    cy.get("[data-cyid=fallback-title]").should("have.text", "404 - Not found");
  });

  it("Link back to homepage", () => {
    cy.visit("/asdgas");

    cy.get("[data-cyid=fallback-link]").click();

    cy.url().should("eq", "http://localhost:8080/");
  });
});
