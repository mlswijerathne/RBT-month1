describe("Hearts Component Library", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the page with correct heading", () => {
    cy.contains("h1", "Hearts Component Library").should("be.visible");
  });

  it("button click counter increments on each click", () => {
    cy.contains("button", /primary \(clicked 0x\)/i).click();
    cy.contains("button", /primary \(clicked 1x\)/i).should("exist");
    cy.contains("button", /primary \(clicked 1x\)/i).click();
    cy.contains("button", /primary \(clicked 2x\)/i).should("exist");
  });

  it("disabled button cannot be clicked", () => {
    cy.contains("button", /disabled/i).should("be.disabled");
  });

  it("input updates value as user types", () => {
    cy.get('input[placeholder="Enter your name"]').type("Lakshitha");
    cy.get('input[placeholder="Enter your name"]').should(
      "have.value",
      "Lakshitha"
    );
  });

  it("modal opens and closes with button and escape key", () => {
    cy.contains("button", /open modal/i).click();
    cy.contains("Example Modal").should("be.visible");
    cy.contains("Press Escape or click outside to close.").should("be.visible");
    cy.get("body").type("{esc}");
    cy.contains("Example Modal").should("not.exist");
  });

  it("dropdown selects an item and shows selection", () => {
    cy.get("[role='combobox']").click();
    cy.get("[role='option']").contains("React").click();
    cy.contains("Selected: react").should("be.visible");
  });

  it("toggle switches dark mode state", () => {
    cy.contains("Dark mode: OFF").should("be.visible");
    cy.get("[role='switch'][aria-label='Dark mode']").click();
    cy.contains("Dark mode: ON").should("be.visible");
  });

  it("dismissible alert can be removed", () => {
    cy.contains("Operation completed successfully!").should("be.visible");
    cy.contains("Operation completed successfully!")
      .parent()
      .find("button")
      .click();
    cy.contains("Operation completed successfully!").should("not.exist");
  });

  it("tabs switch content on click", () => {
    cy.contains("This is the overview tab content.").should("be.visible");
    cy.get("[role='tab']").contains("Features").click();
    cy.contains("This is the features tab content.").should("be.visible");
    cy.contains("This is the overview tab content.").should("not.exist");
    cy.get("[role='tab']").contains("Pricing").click();
    cy.contains("This is the pricing tab content.").should("be.visible");
  });

  it("complete user flow across multiple components", () => {
    // Type name in input
    cy.get('input[placeholder="Enter your name"]').type("Lakshitha");

    // Open and close modal
    cy.contains("button", /open modal/i).click();
    cy.contains("Example Modal").should("be.visible");
    cy.get("body").type("{esc}");

    // Select from dropdown
    cy.get("[role='combobox']").click();
    cy.get("[role='option']").contains("Vue").click();
    cy.contains("Selected: vue").should("be.visible");

    // Enable dark mode toggle
    cy.get("[role='switch'][aria-label='Dark mode']").click();
    cy.contains("Dark mode: ON").should("be.visible");

    // Switch to Pricing tab
    cy.get("[role='tab']").contains("Pricing").click();
    cy.contains("This is the pricing tab content.").should("be.visible");

    // Dismiss error alert
    cy.contains("Something went wrong. Please try again.")
      .parent()
      .find("button")
      .click();
    cy.contains("Something went wrong. Please try again.").should("not.exist");
  });
});
