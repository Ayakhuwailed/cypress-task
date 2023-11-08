export default class LoginPageActions {
  typeInUsernameInputField(username: string) {
    cy.get('[name="username"]').type(username);
  }

  typeInPasswordInputField(password: string) {
    cy.get('[name="password"]').type(password);
  }

  clickOnLoginButton() {
    cy.contains(" Login ").click();
  }

  getUsername() {
    cy.get('[name="username"]');
  }

  getPassword() {
    cy.get('[name="password"]');
  }
}
