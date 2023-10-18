import AddCandidatePageActions from "@pageObjects/TR-01_CreateCandidate/TR-01_CreateCandidateActions";

export default class AddCandidatePageAssertions {
    checkAddCandidatePageIsOpen(){
    cy.url().should("contain","/recruitment/addCandidate/")
}
}