import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import EmployeeDataUtils from "../../../pageObjects/employeePage/dataUtils";
import UserDataUtils from "../../../pageObjects/userPage/dataUtils";
import LeaveDataUtils from "../../../pageObjects/leavePage/dataUtils";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { getEmployee } from "@support/employeePage/dataFakers.js";
import { NewUser } from "@support/userPage/createDataTypes";
import { getUser } from "@support/userPage/dataFakers";
import {
  getLeaveAction,
  getLeaveEntitlements,
  getLeaveRequest,
} from "@support/leavePage/dataFakers";
import LeavePageAssertions from "../../../pageObjects/leavePage/leavePageAssertions";
import LeavePageActions from "../../../pageObjects/leavePage/leavePageActions";

const employeeDataUtil = new EmployeeDataUtils();
const userDataUtil = new UserDataUtils();
const leaveDataUtil = new LeaveDataUtils();
const leavePageAssertion = new LeavePageAssertions();
const leavePageAction = new LeavePageActions();
const employee: NewEmployee = getEmployee();
const user: NewUser = {
  ...getUser(),
};
let id = 0;
let employeeRes: any;
beforeEach(() => {
  userDataUtil.deleteUserByUsername(user.username);
  employeeDataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});
Given("The system has an Employee with Login Details", () => {
  employeeDataUtil.createNewEmployee(employee).then((res) => {
    userDataUtil
      .createNewUser({
        ...user,
        empNumber: res.body.data.empNumber,
      })
      .then((res) => {
        employeeRes = res;
      });
  });
});
Given("The employee has number of entitlement", () => {
  leaveDataUtil.createNewLeaveEntitlements({
    ...getLeaveEntitlements(),
    empNumber: employeeRes.body.data.employee.empNumber,
  });
  cy.logout();
});
When("The employee login to the system", () => {
  cy.login("Cypress test T", "strongPassword@123456");
});
When("The employee requests a leave day in the future", () => {
  leaveDataUtil.createNewLeaveRequest({ ...getLeaveRequest() }).then((res) => {
    id = res.body.data.id;
    cy.logout();
  });
});
When("The admin login to the system", () => {
  cy.login();
});
When("The admin approves the leave request", () => {
  leaveDataUtil
    .createLeaveRequestAction({ ...getLeaveAction() }, id)
    .then(() => {
      cy.logout();
    });
});
When("The employee Opens the My Leave page", () => {
  leavePageAction.openLeavePage();
});
Then(
  "The leave should exist in the records table with status Scheduled",
  () => {
    leavePageAssertion.checkLeaveRequestIsApprove(
      getLeaveRequest().fromDate,
      getLeaveRequest().toDate
    );
  }
);