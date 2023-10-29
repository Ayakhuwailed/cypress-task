export default class candidatePageAssertions {
  checkAddCandidatePageIsOpen() {
    cy.url().should("contain", "/recruitment/addCandidate/");
  }
}
