import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";
import { changeStatusCode } from "../../utils/helpers";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
    cy.wait(500);

    // Set row event and user
    cy.get('div[data-test-id="projects-issue-card-badge-critical"]').as(
      "badge-critical",
    );
    cy.get('div[data-test-id="projects-issue-card-badge-stable"]').as(
      "badge-stable",
    );
    cy.get('div[data-test-id="projects-issue-card-badge-warning"]').as(
      "badge-warning",
    );
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("Should render correct status", () => {
      cy.reload();
      cy.wait("@getProjects");
      cy.wait(1500);

      // Check if badge value is correct
      cy.get("@badge-critical").should("have.text", "Critical");
      cy.get("@badge-warning").should("have.text", "Warning");
      cy.get("@badge-stable").should("have.text", "Stable");

      // Check if badge color is correct
      cy.get("@badge-critical").should(($div) => {
        expect($div).to.have.length(1);
        const className = $div[0].className;
        expect(className).to.match(/badge_error_/);
      });
      cy.get("@badge-warning").should(($div) => {
        expect($div).to.have.length(1);
        const className = $div[0].className;
        expect(className).to.match(/badge_warning_/);
      });
      cy.get("@badge-stable").should(($div) => {
        expect($div).to.have.length(1);
        const className = $div[0].className;
        expect(className).to.match(/badge_success_/);
      });
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            capitalize(changeStatusCode(mockProjects[index].status)),
          );
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
