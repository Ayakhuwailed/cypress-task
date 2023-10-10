import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import dashboardPageActions from "../../../pageObject/dashboardPage/dashboardActions"
import loginPageAssertions from "../../../pageObject/login/loginAssertions";

const dashboardPageAction=new dashboardPageActions()
let loginAssertions = new loginPageAssertions();

Given("User Login Successfully",()=>{
    cy.login()
})
When("User Navigate to Dashboard Page",()=>{
    dashboardPageAction.navigateToDashPage()
})
Then('Dashboard Page Should Load Successfully',()=>{
    loginAssertions.checkDashPage()
})