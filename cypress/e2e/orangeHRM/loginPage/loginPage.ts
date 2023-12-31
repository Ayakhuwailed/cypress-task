import {
  Before,
  DataTable,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import DashboardAssertions from "../../../pageObjects/dashboardPage/assertions";
import LoginPageActions from "../../../pageObjects/loginPage/actions";
import LoginPageAssertions from "../../../pageObjects/loginPage/assertions";

const loginActions = new LoginPageActions(),
  loginAssertions = new LoginPageAssertions(),
  dashboardAssertions = new DashboardAssertions();

Before(() => {
  cy.reload();
});

Given("Open orangeHRM Site", () => {
  cy.visit("/auth/login");
});

Then("Page Should Load Successfully", () => {
  loginAssertions.checkLoginAuthPageIsOpen();
});

Then("Page Should Contain a Button With The Text Login", () => {
  loginAssertions.checkLoginButtonContainsValue("Login", true);
});

When("User Types as Following", (table: DataTable) => {
  table.hashes().forEach((data) => {
    loginActions.typeInUsernameInputField(data.Username);
    loginActions.typeInPasswordInputField(data.Password);
    loginActions.clickOnLoginButton();
    loginAssertions.checkInValidCredentials();
    loginAssertions.checkColorInvalidCredentialsText();
  });
});

When("User Clicks on Login Button", () => {
  loginActions.clickOnLoginButton();
});

Then("User Should See Error Message", () => {
  loginAssertions.checkInValidCredentials();
  loginAssertions.checkBackgroundInvalidCredentialsText();
  loginAssertions.checkColorInvalidCredentialsText();
});

When("User Should remain on the login page", () => {
  loginAssertions.checkLoginAuthPageIsOpen();
});

When("Both Inputs Should Be Empty", () => {
  loginAssertions.checkUsernameValue("", true);
  loginAssertions.checkPasswordValue("", true);
});

Then("User Should See Required Text Under Both Inputs", () => {
  loginAssertions.checkUsernameInputHasErrorMessage("Required", true);
  loginAssertions.checkPasswordInputHasErrorMessage("Required", true);
});

Then("The Inputs Border Should Be Red", () => {
  loginAssertions.checkRedBorderUsername();
  loginAssertions.checkRedBorderPassword();
});

Given("Username Input", () => {
  loginActions.getUsername();
});

Then("User Should See Required Text Under Username Input", () => {
  loginAssertions.checkUsernameInputHasErrorMessage("Required", true);
});

Then("The Username Input Border Should Be Red", () => {
  loginAssertions.checkRedBorderUsername();
});

Given("Password Input", () => {
  loginActions.getPassword();
});

Then("User Should See Required Text Under Password Input", () => {
  loginAssertions.checkPasswordInputHasErrorMessage("Required", true);
});

Then("The Password Input Border Should Be Red", () => {
  loginAssertions.checkRedBorderPassword();
});

When("User Login With Valid Credentials", () => {
  cy.login();
});

Then(
  "User Should Login Successfully and Home Page Should Load Successfully",
  () => {
    dashboardAssertions.checkDashboardPageIsOpen();
  }
);

When("User Types Valid Username", () => {
  loginActions.typeInUsernameInputField("Admin");
});

When("User Types Valid Password", () => {
  loginActions.typeInPasswordInputField("admin123");
});
