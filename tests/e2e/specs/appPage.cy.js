describe("Testing First Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".content_start button")
    .click();
  });

  it("Accesses the website", () => {
    cy.url().should("include", "/");
  });













    /* -------------------------------------------------------------------------------------- */
  /*                                        Testing footer                                  */
  /* -------------------------------------------------------------------------------------- */

  it("Footer is visible", () => {
    cy.get(".footer").should("be.visible");
  });

  it("Link linkedin", () => {
    cy.get(".div_logo .logo_linkedin a")
    .should("have.attr", "href", "https://www.linkedin.com/in/steven-lef%C3%A8bvre-9697b127b/")
    .should("have.attr", "target")
    .and("include", "_blank");
  });

  it("Linkedin img is visbile", () => {
    cy.get(".div_logo .logo_linkedin img")
    .should("have.attr", "alt", "logo_linkedin")
    .should("be.visible");
  });

  it("GitHub linkedin", () => {
    cy.get(".div_logo .logo_git a")
    .should("have.attr", "href", "https://github.com/HamelenYakkington")
    .should("have.attr", "target")
    .and("include", "_blank");
  });

  it("Footer is visible", () => {
    cy.get(".footer").should("be.visible");
  });
});
