export default class CandidatePageAssertions {
  checkAddCandidatePageIsOpen() {
    cy.url().should("contain", "/recruitment/addCandidate/");
  }
}
