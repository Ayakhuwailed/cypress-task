declare namespace Cypress {
  interface Chainable {
    login(username?: string, password?: string): void;
    logout(): any;
  }
}
Cypress.Commands.add("logout", () => {
  cy.request("auth/logout");
});
Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
  cy.intercept("/web/index.php/api/v2/dashboard/employees/time-at-work**").as(
    "time-at-work"
  );
  cy.intercept("/web/index.php/api/v2/dashboard/employees/action-summary").as(
    "action-summary"
  );
  cy.intercept("/web/index.php/api/v2/dashboard/shortcuts").as("shortcuts");
  cy.intercept("/web/index.php/api/v2/buzz/**").as("feed-limit");
  cy.intercept("/web/index.php/api/v2/dashboard/employees/leaves**").as(
    "leavesDate"
  );
  cy.visit("/auth/login");
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.contains(" Login ").click();

  cy.wait([
    "@time-at-work",
    "@action-summary",
    "@shortcuts",
    "@feed-limit",
    "@leavesDate",
  ]);
});
