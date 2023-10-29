import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import EmployeeDataUtils from "../../../pageObjects/employeePage/dataUtils";
import UserDataUtils from "../../../pageObjects/userPage/dataUtils";
import LeaveDataUtils from "../../../pageObjects/leavePage/dataUtils";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { getEmployee } from "@support/employeePage/dataFakers.js";
import { NewUser } from "@support/userPage/createDataTypes";
import { getUser } from "@support/userPage/dataFakers";
import {
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
let id: number;
let globalEmpNumber: any;
beforeEach(() => {
  userDataUtil.deleteUserByUsername(user.username);
  employeeDataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});
Given("The system has an Employee with Login Details", () => {
  employeeDataUtil.createNewEmployee(employee).then((res) => {
    userDataUtil
      .createNewUser({
        ...user,
        empNumber: res,
      })
      .then((res) => {
        globalEmpNumber = res.body.data.employee.empNumber;
      });
  });
});
Given("The employee has number of entitlement", () => {
  leaveDataUtil.createNewLeaveEntitlements({
    ...getLeaveEntitlements(),
    empNumber: globalEmpNumber,
  });
  cy.then(() => {
    cy.logout();
  });
});
When("The employee login to the system", () => {
  cy.login(user.username, user.password);
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
  cy.then(() => {
    leaveDataUtil.setLeaveRequestActionStatusByLeaveId(id, "APPROVE");
  }).then(() => {
    cy.logout();
  });
});
When("The employee Opens the My Leave page", () => {
  leavePageAction.openLeavePage();
});
Then(
  "The leave should exist in the records table with status Scheduled",
  () => {
    leavePageAssertion.checkLeaveRecordContainsValueInColumn(
      0,
      "Status",
      "Scheduled",
      true
    );
    leavePageAssertion.checkLeaveRecordContainsValueInColumn(
      0,
      "Date",
      getLeaveRequest().fromDate,
      true
    );
    leavePageAssertion.checkLeaveRecordContainsValueInColumn(
      0,
      "Date",
      getLeaveRequest().toDate,
      true
    );
    cy.then(() => {
      cy.logout();
    });
  }
);
afterEach(() => {
  cy.then(() => {
    cy.login();
  }).then(() => {
    userDataUtil.deleteUserByUsername(user.username);
    employeeDataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
  });
});
