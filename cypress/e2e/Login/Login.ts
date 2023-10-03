import {After, And, Before, DataTable, Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import loginPageActions from "../../PageObject/Login/LoginActions";
import loginPageAssertions from "../../PageObject/Login/LoginAssertions"

let loginActions = new loginPageActions();
let loginAssertions = new loginPageAssertions();
Before(() => {
    cy.reload()
})

Given("Open orangeHRM Site", () => {
    cy.visit('/auth/login')
});
Then("Page Should Load Successfully", () => {
    loginAssertions.LoginAuthPage()
});
Then("Page Should Contain a Button With The Text Login", () => {
    loginAssertions.LoginButtonText();
});

When('User Types as Following',(table:DataTable)=>{
    table.hashes().forEach((data) => {
       loginActions.typeUsername(data.Username)
        loginActions.typePassword(data.Password)
        loginActions.clickOnLoginButton()
        loginAssertions.inValidCredentials()
        loginAssertions.colorInvalidCredentialsText()
    });
})

And("User Clicks on Login Button", () => {
    loginActions.clickOnLoginButton()
})
Then('User Should See Error Message', () => {
    loginAssertions.inValidCredentials()
    loginAssertions.backgroundInvalidCredentialsText()
    loginAssertions.colorInvalidCredentialsText()
})
And('User Should remain on the login page', () => {
    loginAssertions.LoginAuthPage()
})
And('Both Inputs Should Be Empty', () => {
    loginAssertions.emptyUsername()
    loginAssertions.emptyPassword()
})

Then('User Should See Required Text Under Both Inputs', () => {
    loginAssertions.requiredText()
})
And('The Required Text Color Is Red', () => {
    loginAssertions.requiredTextColor()
})
And('The Inputs Border Should Be Red', () => {
    loginAssertions.redBorderUsername()
    loginAssertions.redBorderPassword()
})

Given('Username Input', () => {
    loginActions.getUsername()
})
Then('User Should See Required Text Under Username Input', () => {
    loginAssertions.requiredText()
})
And('The Username Input Border Should Be Red', () => {
    loginAssertions.redBorderUsername()
})

Given('Password Input', () => {
    loginActions.getPassword()
})
Then('User Should See Required Text Under Password Input', () => {
    loginAssertions.requiredText()
})
And('The Password Input Border Should Be Red', () => {
    loginAssertions.redBorderPassword()
})

When("User Types Valid Username", () => {
    loginActions.typeUsername('Admin')
})
And("User Types Valid Password", () => {
    loginActions.typePassword('admin123')
})
Then("User Should Login Successfully and Home Page Should Load Successfully", () => {
    loginAssertions.DashPage()
})
