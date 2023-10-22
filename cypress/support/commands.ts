declare namespace Cypress {
  interface Chainable {
    login(username?: string, password?: string): void;
    logout();
  }
}
Cypress.Commands.add("logout", () => {
  cy.request(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout"
  );
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
  // cy.intercept("/web/index.php/api/v2/dashboard/employees/subunit").as(
  //     "subunit"
  // );
  // cy.intercept("/web/index.php/api/v2/dashboard/employees/locations").as(
  //     "locations"
  // );
  cy.intercept("POST", "/web/index.php/events/push").as("push");

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
    // "@subunit",
    // "@locations",
    "@push",
  ]);
});
