
export default class AddCandidatePageAssertions {
  checkAddCandidatePageIsOpen() {
    cy.url().should("contain", "/recruitment/addCandidate/");
  }
}
