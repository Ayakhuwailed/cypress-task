export default class CandidatePageActions {
  openAddCandidatePage() {
    cy.intercept("/web/index.php/api/v2/recruitment/vacancies***").as(
      "vacancies"
    );
    cy.intercept("/web/index.php/api/v2/leave/workweek***").as("workweek");
    cy.intercept("/web/index.php/api/v2/leave/holidays***").as("holidays");
    cy.visit("/recruitment/addCandidate");
    cy.wait(["@vacancies", "@workweek", "@holidays"]);
  }

  typeInFirstNameInputField(firstName: string) {
    cy.get('[name="firstName"]').type(firstName);
  }

  typeInLastNameInputField(lastName: string) {
    cy.get('[name="lastName"]').type(lastName);
  }

  typeInEmailInputField(email: string) {
    cy.get(".oxd-input-group.oxd-input-field-bottom-space")
      .find(".oxd-input-group__label-wrapper")
      .get(".oxd-input.oxd-input--active")
      .parent()
      .eq(3)
      .type(email);
  }

  selectVacancyName(vacancy: string) {
    cy.get(".oxd-select-wrapper").click().children().contains(vacancy).click();
  }

  clickOnSaveButton() {
    cy.get('[type="submit"]').contains("Save").click();
  }
}
