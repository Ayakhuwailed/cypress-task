export default class loginPageActions {
    typeUsername(username: string) {
        cy.get('[name="username"]').type(username)
    }
    typePassword(password: string) {
        cy.get('[name="password"]').type(password)
    }
    clickOnLoginButton() {
        cy.contains(" Login ").click()
    }
    getUsername(){
        cy.get('[name="username"]')
    }
    getPassword() {
        cy.get('[name="password"]')
    }
    clearFields(){
        cy.get('[name="username"]').clear();
        cy.get('[name="password"]').clear();
    }

}