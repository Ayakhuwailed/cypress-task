export default class LoginPageAssertion {
    checkLoginAuthPageIsOpen() {
        cy.url().should("contain", "/auth/login");
    }

    checkLoginButtonContainsValue(message, isExist) {
        isExist && cy.get('[type="submit"]').should("contain", message);
    }

    checkInValidCredentials() {
        cy.get(".orangehrm-login-error").should("contain", "Invalid credentials");
    }

    checkBackgroundInvalidCredentialsText() {
        cy.get('[role="alert"]').should("have.css", "background-color", "rgba(235, 9, 16, 0.05)");
    }

    checkColorInvalidCredentialsText() {
        cy.contains("Invalid credentials").should("have.css", "color", "rgb(235, 9, 16)");
    }

    checkUsernameValue(value, isEmpty) {
        cy.get('[name="username"]').should("contain", isEmpty ? "" : value);
    }

    checkPasswordValue(value, isEmpty) {
        cy.get('[name="password"]').should("contain", isEmpty ? "" : value);
    }

    checkRedBorderUsername() {
        cy.get('[name="username"]').should("have.css", "border", "0.8px solid rgb(235, 9, 16)");
    }

    checkRedBorderPassword() {
        cy.get('[name="password"]').should("have.css", "border", "0.8px solid rgb(235, 9, 16)");
    }

    checkUsernameInputHasErrorMessage(message, isExist) {
        isExist && cy.get('[name="username"]').parents().eq(1).contains("span", message).should("exist");
        isExist &&
            cy
                .get('[name="username"]')
                .parents()
                .eq(1)
                .contains("span", message)
                .should("have.css", "color", "rgb(235, 9, 16)");
    }

    checkPasswordInputHasErrorMessage(message, isExist) {
        isExist && cy.get('[name="password"]').parents().eq(1).contains("span", message).should("exist");
        isExist &&
            cy
                .get('[name="password"]')
                .parents()
                .eq(1)
                .contains("span", message)
                .should("have.css", "color", "rgb(235, 9, 16)");
    }
}
