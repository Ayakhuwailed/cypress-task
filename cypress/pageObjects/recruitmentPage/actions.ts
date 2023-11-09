export default class RecruitmentPageActions {
  openApplicationStagePage(id: number) {
    cy.intercept("/web/index.php/api/v2/recruitment/vacancies***").as(
      "vacancies"
    );
    cy.intercept("/web/index.php/api/v2/leave/workweek***").as("workweek");
    cy.intercept("/web/index.php/api/v2/leave/holidays***").as("holidays");
    cy.visit(`/recruitment/addCandidate/${id}`);
    cy.wait(["@vacancies", "@workweek", "@holidays"]);
  }

  clickOnButtonStatus(buttonName: string) {
    cy.get(".orangehrm-card-container")
      .find("button")
      .contains(buttonName)
      .click({ force: true });
  }

  getInputByIndex(index) {
    return cy
      .get(".orangehrm-card-container")
      .find("form")
      .children()
      .eq(1)
      .find("input")
      .eq(index);
  }

  typeInInterviewTitleInputField(title: string) {
    this.getInputByIndex(0).type(title, { force: true });
    return this;
  }

  typeInInterviewerNameInputField(name: string) {
    this.getInputByIndex(1)
      .type(name, { force: true })
      .get("[role='listbox']")
      .contains(name)
      .click({ force: true });
    return this;
  }

  typeInInterviewDateInputField(date: string) {
    this.getInputByIndex(2).type(date, { force: true });
    return this;
  }
}
