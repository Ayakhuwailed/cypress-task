export default class EmployeeActions {
  navigateToAddEmployeePage() {
    cy.intercept("/web/index.php/api/v2/pim/employees").as("employees");
    cy.intercept("/web/index.php/api/v2/admin/users").as("users");
    cy.visit("/pim/addEmployee");
    cy.wait(["@employees", "@users"]);
  }

  typeInFirstNameInputField(firstName) {
    cy.get('[name="firstName"]').type(firstName);
  }

  typeInLastNameInputField(lastName) {
    cy.get('[name="lastName"]').type(lastName);
  }

  typeInEmployeeIdInputField(id) {
    cy.get(".oxd-grid-2.orangehrm-full-width-grid")
      .find("input")
      .clear()
      .type(id);
  }

  clickOnSaveButton() {
    cy.get('[type="submit"]').click();
  }

  getId() {
    return cy.url().then((url): string => {
      const id = url.split("/").pop();
      return id;
    });
  }
}
