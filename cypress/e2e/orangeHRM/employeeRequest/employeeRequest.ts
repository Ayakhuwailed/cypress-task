import {And, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import employeeActions from "../../../pageObject/addEmployee/employeeActions"
import employeeAssertions from "../../../pageObject/addEmployee/employeeAssertions"

let employeeAction = new employeeActions();
let employeeAssertion = new employeeAssertions();
let employeesAddedIds: number[] = []
beforeEach(() => {
    cy.login()
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
Then('Successfully Added Toast', () => {
    employeeAssertion.successfullyAddedToast()
    employeeAction.getId().then((id: number) => {
        employeesAddedIds.push(id)
        // cy.wait(8000)
        // employeeAssertion.employeeDetails(id)
    })

})
Then('Post Request Done', () => {
    employeeAction.addEmployeeReq().then((id: number) => {
        employeesAddedIds.push(id)
    })
})
afterEach(() => {
    employeeAction.deleteEmployeeReq(employeesAddedIds)
    employeesAddedIds = [];
})