import {And, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import employeeActions from "../../../pageObjects/employeePage/employeeActions"
import employeeAssertions from "../../../pageObjects/employeePage/employeeAssertions"
import dataUtils from "../../../pageObjects/employeePage/dataUtils"
import {NewEmployee} from "@support/employeePage/createDataTypes";

let employeeAction = new employeeActions();
let employeeAssertion = new employeeAssertions();
let dataUtil = new dataUtils();

const employee: NewEmployee = {
    employeeId: "1234",
    firstName: "aya",
    lastName: "khuwailed",
}
beforeEach(() => {
    dataUtil.deleteEmployeeByEmployeeId(employee.employeeId)
})

When('User Navigates to Add Employee Page', () => {
    // cy.employeePage()
    employeeAction.navigateToAddEmployeePage()
})
And('User Fills the Inputs', () => {
    // cy.wait(9000)
    employeeAction.fillAddEmployeeInputs()
})
And('User Clicks On Save Button', () => {
    employeeAction.clickOnSaveButton()
})
Then('Successfully Added Toast', () => {
    employeeAssertion.successfullyAddedToast()
    employeeAction.getId()

})
Then('Post Request Done', () => {
    dataUtil.createNewEmployee(employee)
})
Then('Search Request Done', () => {
    dataUtil.getEmployeeByEmployeeId(employee.employeeId)
})
afterEach(() => {
    dataUtil.deleteEmployeeByEmployeeId(employee.employeeId)
})