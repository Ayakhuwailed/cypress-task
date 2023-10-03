export default class LoginPageAssertion{
    DashPage() {
        cy.url().should('contain', 'dashboard/index')
    }
    LoginAuthPage() {
        cy.url().should('contain', '/auth/login')
    }
    LoginButtonText(){
        cy.get('[type="submit"]').should("contain",'Login' )
    }
    inValidCredentials() {
        cy.get('.orangehrm-login-error').should('contain','Invalid credentials')
    }
    backgroundInvalidCredentialsText() {
        cy.get('[role="alert"]').should('have.css', 'background-color', 'rgba(235, 9, 16, 0.05)')
    }

    colorInvalidCredentialsText() {
        cy.contains('Invalid credentials').should('have.css', 'color', 'rgb(235, 9, 16)')
    }
    emptyUsername() {
        cy.get('[name="username"]').should('be.empty')
    }

    emptyPassword() {
        cy.get('[name="password"]').should('be.empty')
    }

    redBorderUsername() {
        cy.get('[name="username"]').should('have.css', 'border', '0.8px solid rgb(235, 9, 16)')

    }

    redBorderPassword() {
        cy.get('[name="password"]').should('have.css', 'border', '0.8px solid rgb(235, 9, 16)')

    }
    requiredTextColor(){
        cy.get('span').contains('Required').should('have.css', 'color', 'rgb(235, 9, 16)')

    }
    requiredText(){
        cy.get('span').should('contain','Required')
    }
}