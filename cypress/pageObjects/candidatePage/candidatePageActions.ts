export default class candidatePageActions {
  openAddCandidatePage() {
    cy.intercept("/web/index.php/api/v2/recruitment/vacancies***").as(
      "vacancies"
    );
    cy.intercept("/web/index.php/api/v2/leave/workweek***").as("workweek");
    cy.intercept("/web/index.php/api/v2/leave/holidays***").as("holidays");
    cy.visit("/recruitment/addCandidate");
    cy.wait(["@vacancies", "@workweek", "@holidays"]);
  }

  typeInFirstNameInputField(firstName) {
    cy.get('[name="firstName"]').type(firstName);
  }

  typeInLastNameInputField(lastName) {
    cy.get('[name="lastName"]').type(lastName);
  }

  typeInEmailInputField(email) {
    cy.get(".oxd-input-group.oxd-input-field-bottom-space")
      .find(".oxd-input-group__label-wrapper")
      .get(".oxd-input.oxd-input--active")
      .parent()
      .eq(3)
      .type(email);
  }

  clickOnSaveButton() {
    cy.get('[type="submit"]').contains("Save").click();
  }
}
