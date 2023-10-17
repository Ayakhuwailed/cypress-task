export default class TR01_CreateCandidateAssertions {
navigateToRecruitmentPage(){
    cy.url().should("contain","/recruitment/addCandidate/")
}
}