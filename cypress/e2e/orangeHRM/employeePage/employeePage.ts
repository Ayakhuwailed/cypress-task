import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { NewUser } from "@support/userPage/createDataTypes";
import dataUtils from "../../../pageObjects/employeePage/dataUtils";
import EmployeeActions from "../../../pageObjects/employeePage/actions";
import EmployeeAssertions from "../../../pageObjects/employeePage/assertions";
import UserDataUtils from "../../../pageObjects/userPage/dataUtils";
import { getEmployee } from "@support/employeePage/dataFakers.js";
import { getUser } from "@support/userPage/dataFakers";

const employeeAction = new EmployeeActions(),
  employeeAssertion = new EmployeeAssertions(),
  dataUtil = new dataUtils(),
  userDataUtil = new UserDataUtils(),
  employee: NewEmployee = getEmployee(),
  user: NewUser = { ...getUser() };

beforeEach(() => {
  userDataUtil.deleteUserByUsername(user.username);
  dataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});

When("User Navigates to Add Employee Page", () => {
  employeeAction.navigateToAddEmployeePage();
});

When("User Fills the Inputs", () => {
  employeeAction.typeInFirstNameInputField(employee.firstName);
  employeeAction.typeInLastNameInputField(employee.lastName);
  employeeAction.typeInEmployeeIdInputField(employee.employeeId);
});

When("User Clicks On Save Button", () => {
  employeeAction.clickOnSaveButton();
});

Then("Successfully Added Toast", () => {
  employeeAssertion.successfullyAddedToast();
  employeeAction.getId();
});

Then("Post Request Done", () => {
  dataUtil.createNewEmployee(employee);
});

Then("Search Request Done", () => {
  dataUtil.getEmployeeByEmployeeId(employee.employeeId);
});

Then("Post Employee With User Request Done", () => {
  dataUtil.createNewEmployee(employee).then((res) => {
    userDataUtil.createNewUser({
      ...user,
      empNumber: res,
    });
  });
});

afterEach(() => {
  userDataUtil.deleteUserByUsername(user.username);
  dataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});
