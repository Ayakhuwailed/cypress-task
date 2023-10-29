import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { NewUser } from "@support/userPage/createDataTypes";
import dataUtils from "../../../pageObjects/employeePage/dataUtils";
import employeeActions from "../../../pageObjects/employeePage/employeeActions";
import employeeAssertions from "../../../pageObjects/employeePage/employeeAssertions";
import userDataUtils from "../../../pageObjects/userPage/dataUtils";
import { getEmployee } from "@support/employeePage/dataFakers.js";
import { getUser } from "@support/userPage/dataFakers";

const employeeAction = new employeeActions();
const employeeAssertion = new employeeAssertions();
const dataUtil = new dataUtils();
const userDataUtil = new userDataUtils();

const employee: NewEmployee = getEmployee();
const user: NewUser = { ...getUser(), empNumber: 7 };

beforeEach(() => {
  userDataUtil.deleteUserByUsername(user.username);
  dataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});

When("User Navigates to Add Employee Page", () => {
  employeeAction.navigateToAddEmployeePage();
});

When("User Fills the Inputs", () => {
  employeeAction.typeInFirstNameInputField("test");
  employeeAction.typeInLastNameInputField("test");
  employeeAction.typeInEmployeeIdInputField("1234");
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
