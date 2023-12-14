import { version } from "../../package.json";
describe("Footer", () => {
  beforeEach(() => {
    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // Get element header
    cy.get('img[data-test-id="footer-logo"]').as("footer-navigation-logo");
    cy.get('p[data-test-id="footer-version"]').as("footer-navigation-version");
    cy.get('div[data-test-id="footer-navigation"] a')
      .eq(0)
      .as("footer-navigation-docs");
    cy.get('div[data-test-id="footer-navigation"] a')
      .eq(1)
      .as("footer-navigation-api");
    cy.get('div[data-test-id="footer-navigation"] a')
      .eq(2)
      .as("footer-navigation-help");
    cy.get('div[data-test-id="footer-navigation"] a')
      .eq(3)
      .as("footer-navigation-community");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("should display correct version", () => {
      cy.get("@footer-navigation-version").should(
        "have.text",
        `Version: ${version}`,
      );
    });
    it("should href correctly", () => {
      cy.get("@footer-navigation-docs").should("have.attr", "href", "#");
      cy.get("@footer-navigation-api").should("have.attr", "href", "#");
      cy.get("@footer-navigation-help").should("have.attr", "href", "#");
      cy.get("@footer-navigation-community").should("have.attr", "href", "#");
    });
    it("should display logo", () => {
      cy.get("@footer-navigation-logo").should(
        "have.attr",
        "src",
        "/icons/logo-small.svg",
      );
    });
  });
});
