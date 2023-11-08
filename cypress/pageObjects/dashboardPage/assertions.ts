export default class DashboardAssertions {
  checkDashboardPageIsOpen() {
    cy.url().should("contain", "dashboard/index");
  }
}
