export default class EmployeeAssertions {
  successfullyAddedToast() {
    cy.get(".oxd-toast--success");
    cy.get(".oxd-toast-content-text").contains("Success");
    cy.location("pathname", { timeout: 60000 }).should(
      "include",
      "/pim/viewPersonalDetails/empNumber/"
    );
  }
}
