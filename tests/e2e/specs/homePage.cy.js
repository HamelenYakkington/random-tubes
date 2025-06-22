describe("Testing Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Accesses the website", () => {
    cy.url().should("include", "/");
  });

  /* -------------------------------------------------------------------------------------- */
  /*                                    Testing Title                                       */
  /* -------------------------------------------------------------------------------------- */
  it("Displays one H1 element", () => {
    cy.get("h1").should("have.length", 1);
  });

  it("H1 has expected content", () => {
    cy.get("h1").should("contain.text", "RandomTubes");
  });

  it("H1 is visible", () => {
    cy.get("h1").should("have.length", 1);
  });

  /* -------------------------------------------------------------------------------------- */
  /*                                    Testing logo image                                  */
  /* -------------------------------------------------------------------------------------- */

  it("Displays one .logo_start div", () => {
    cy.get(".logo_start").should("have.length", 1);
  });

  it(".logo_start div is visible", () => {
    cy.get(".logo_start").should("be.visible");
  });

  it("Contains an <img> inside .logo_start", () => {
    cy.get(".logo_start img").should("have.length", 1);
  });

  it("The <img> inside .logo_start has an alt attribute", () => {
    cy.get(".logo_start img")
      .should("have.attr", "alt")
      .and("not.be.empty");
  });

  it("The <img> inside .logo_start is visible", () => {
    cy.get(".logo_start img").should("be.visible");
  });

  /* -------------------------------------------------------------------------------------- */
  /*                                    Testing starting button                             */
  /* -------------------------------------------------------------------------------------- */

  it("Display one button", () => {
    cy.get(".content_start button").should("have.length", 1);
  });

  it("Display one button", () => {
    cy.get(".content_start button")
      .should("contain.text", "Start"); 
  });

  it("Button start is visible", () => {
    cy.get(".content_start button")
      .should("be.visible");
  });

  /* -------------------------------------------------------------------------------------- */
  /*                                        Testing footer                                  */
  /* -------------------------------------------------------------------------------------- */

  it("Footer is visible", () => {
    cy.get(".footer_start").should("be.visible");
  });
});

