import {And, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import employeeActions from "../../../pageObjects/employeePage/employeeActions"
import employeeAssertions from "../../../pageObjects/employeePage/employeeAssertions"
import dataUtils from "../../../pageObjects/employeePage/dataUtils"
import userDataUtils from "../../../pageObjects/userPage/dataUtils"
import {NewEmployee} from "@support/employeePage/createDataTypes";

let employeeAction = new employeeActions();
let employeeAssertion = new employeeAssertions();
let dataUtil = new dataUtils();
let userDataUtil = new userDataUtils();

const employee: NewEmployee = {
    employeeId: "1234",
    firstName: "aya",
    lastName: "khuwailed",
}
beforeEach(() => {
    dataUtil.deleteEmployeeByEmployeeId(employee.employeeId)
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
    employeeAction.getId()

})
Then('Post Request Done', () => {
    dataUtil.createNewEmployee(employee)
})
Then('Search Request Done', () => {
    dataUtil.getEmployeeByEmployeeId(employee.employeeId)
})
Then("Post Employee With User Request Done",()=>{
    dataUtil.createNewEmployee(employee).then((res)=>{
        userDataUtil.createNewUser( {
            username: "ayaakh",
            password: "1234aaa",
            status: "Enabled",
            userRoleName: "ESS",
            empNumber: res.body.data.empNumber
        }).then((resp)=>{
            userDataUtil.deletesUserByUsername(resp.body.data.userName)
        })
    })

})
afterEach(() => {
    dataUtil.deleteEmployeeByEmployeeId(employee.employeeId)
})