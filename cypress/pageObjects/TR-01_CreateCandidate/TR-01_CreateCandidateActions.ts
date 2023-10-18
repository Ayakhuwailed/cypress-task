import {getPrefix} from "@support/utils";

export default class AddCandidatePageActions {
    openAddCandidatePage(){
    cy.visit('/recruitment/addCandidate')
    console.log(getPrefix(),"prefix")
}
    typeInFirstNameInputField(firstName){
        cy.get('[name="firstName"]').type(firstName);
    }
    typeInLastNameInputField(lastName){
        cy.get('[name="lastName"]').type(lastName);
    }
    typeInEmailInputField(email){
        cy.get(".oxd-input-group.oxd-input-field-bottom-space").find(".oxd-input-group__label-wrapper").get(".oxd-input.oxd-input--active").parent().eq(3).type(email)
    }
    clickOnSaveButton(){
        cy.get('[type="submit"]').contains("Save").click()
    }
}