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
  /*                                        Testing header                                  */
  /* -------------------------------------------------------------------------------------- */

  it("Header is visible", () => {
    cy.get(".div_head").should("be.visible");
  });
  

  it("Header title is RandomTubes", () => {
    cy.get("div.title_head.col-sm-2.col-12")
      .should("be.visible")
      .should("contain.text", "RandomTubes");
  });

  it("Header logo", () => {
    cy.get("div.logo_div.col-sm-2.col-12 > img").should(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  })});


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


  /* -------------------------------------------------------------------------------------- */
  /*                                        Testing Lecter                                  */
  /* -------------------------------------------------------------------------------------- */

it("Have an YouTube API Token", () => {
  cy.get("body").then(($body) => {
    const flash = $body.find(".flash_message:visible");

    if (flash.length) {
      cy.wrap(flash)
        .should("not.contain.text", "Error : API key missing");
    }
  });
});


it("Initial YouTube iframe", () => {
  cy.get("div.tube_reader > iframe")
    .and("have.attr", "src")
    .then((src) => {
      expect(src).to.equal("https://www.youtube.com/embed/jNQXAC9IVRw?si=TOifG8yNjoy6pwNY");
    });
  });

it("Prev button is disabled", () => {
  cy.get("div > button.prev_button")
    .should("be.visible")
    .and("have.class", "a_button_disabled");
});

it("Next button is not disabled", () => {
  cy.get("div > button.next_button")
    .should("be.visible")
    .and("not.have.class", "a_button_disabled")
    .and("have.class", "a_button_primary");
});

it("Clicking the Next button enable the prev button and update the iframe src", () => {
  const initialSrc =
    "https://www.youtube.com/embed/jNQXAC9IVRw?si=TOifG8yNjoy6pwNY";

  cy.get("div > button.next_button")
    .should("be.visible")
    .click();

  cy.get("div.tube_reader > iframe")
    .should("have.attr", "src")
    .and("not.equal", initialSrc);

  cy.get("div > button.prev_button")
    .should("be.visible")
    .and("not.have.class", "a_button_disabled")
    .click();

  cy.get("div.tube_reader > iframe")
    .should("have.attr", "src")
    .and("equal", initialSrc);
});




});