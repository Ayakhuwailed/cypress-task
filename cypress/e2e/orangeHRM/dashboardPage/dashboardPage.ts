import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import DashboardPageActions from "../../../pageObjects/dashboardPage/actions";
import DashboardAssertion from "../../../pageObjects/dashboardPage/assertions";

const dashboardPageAction = new DashboardPageActions(),
  dashboardAssertions = new DashboardAssertion();

Given("User Login Successfully", () => {
  cy.login();
});

When("User Navigate to Dashboard Page", () => {
  dashboardPageAction.navigateToDashPage();
});

Then("Dashboard Page Should Load Successfully", () => {
  dashboardAssertions.checkDashboardPageIsOpen();
});
