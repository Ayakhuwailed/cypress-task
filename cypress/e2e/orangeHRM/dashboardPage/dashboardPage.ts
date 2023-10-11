import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import dashboardPageActions from "../../../pageObjects/dashboardPage/dashboardActions"
import dashboardAssertion from "../../../pageObjects/dashboardPage/dashboardAssertions";

const dashboardPageAction=new dashboardPageActions()
let dashboardAssertions=new dashboardAssertion()

Given("User Login Successfully",()=>{
    cy.login()
})
When("User Navigate to Dashboard Page",()=>{
    dashboardPageAction.navigateToDashPage()
})
Then('Dashboard Page Should Load Successfully',()=>{
    dashboardAssertions.checkDashboardPageIsOpen()
})