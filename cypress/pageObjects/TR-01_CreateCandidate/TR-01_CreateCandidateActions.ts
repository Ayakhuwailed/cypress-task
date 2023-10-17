import {getPrefix} from "@support/utils";

export default class TR01_CreateCandidateActions {
    navigateToCandidatePage(){
    cy.visit('/recruitment/addCandidate')
    console.log(getPrefix(),"prefix")
}
    fillsInputs(){
        cy.get('[name="firstName"]').type("first cypress");
        cy.get('[name="lastName"]').type("last cypress");
        cy.get(".oxd-input-group.oxd-input-field-bottom-space").find(".oxd-input-group__label-wrapper").get(".oxd-input.oxd-input--active").parent().eq(3).type("test@test.com")
    }
    clickOnSaveButton(){
        cy.get('[type="submit"]').contains("Save").click()
    }
}