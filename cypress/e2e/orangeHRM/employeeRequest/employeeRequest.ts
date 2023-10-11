import {And, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import employeeActions from "../../../pageObject/employeePage/employeeActions"
import employeeAssertions from "../../../pageObject/employeePage/employeeAssertions"
import dataUtils from "../../../pageObject/employeePage/dataUtils"

let employeeAction = new employeeActions();
let employeeAssertion = new employeeAssertions();
let dataUtil = new dataUtils();


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
    })

})
Then('Post Request Done', () => {
    dataUtil.createEmployee().then((id: number) => {
        employeesAddedIds.push(id)
    })
})
Then('Search Request Done',()=>{
    dataUtil.getEmployeeByEmployeeId('415')
})
afterEach(() => {
    dataUtil.deleteEmployee(employeesAddedIds)
    employeesAddedIds = [];
})