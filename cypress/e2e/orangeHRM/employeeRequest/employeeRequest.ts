import {And, Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import employeeActions from "../../../PageObject/addEmployee/employeeActions"
import employeeAssertions from "../../../PageObject/addEmployee/employeeAssertions"
import loginPageActions from "../../../PageObject/Login/LoginActions";
import loginPageAssertions from "../../../PageObject/Login/LoginAssertions";

let employeeAction = new employeeActions();
let employeeAssertion = new employeeAssertions();
let loginPageAction = new loginPageActions();
let loginPageAssertion = new loginPageAssertions();

let employeesAddedIds: number[] = []
beforeEach(() => {
    cy.visit('/auth/login')
    loginPageAction.typeUsername('Admin')
    loginPageAction.typePassword('admin123')
    loginPageAction.clickOnLoginButton()
    loginPageAssertion.DashPage()
})
afterEach(() => {
    employeeAction.deleteEmployeeReq(employeesAddedIds)
    employeesAddedIds = [];
})
When('User Navigates to Add Employee Page', () => {
    employeeAction.navigateToAddEmployeePage()
})
And('User Fills the Inputs', () => {
    employeeAction.fillAddEmployeeInputs()
})
And('User Clicks On Save Button', () => {
    employeeAction.clickOnSaveButton()
})
Then('Successfully Added Alert', () => {
    employeeAssertion.successfullyAddedToast()
    employeeAction.getId().then((id:number)=>{
       employeesAddedIds.push(id)
    })

})
Then('Post Request Done', () => {
    employeeAction.addEmployeeReq().then((id: number) => {
        employeesAddedIds.push(id)
    })
})