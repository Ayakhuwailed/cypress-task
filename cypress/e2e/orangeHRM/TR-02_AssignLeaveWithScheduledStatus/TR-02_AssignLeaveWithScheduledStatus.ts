import {And, Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import employeeDataUtils from "../../../pageObjects/employeePage/dataUtils";
import userDataUtils from "../../../pageObjects/userPage/dataUtils";
import leaveDataUtils from "../../../pageObjects/leavePage/dataUtils";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { getEmployee } from "@support/employeePage/dataFakers.js";
import { NewUser } from "@support/userPage/createDataTypes";
import { getUser } from "@support/userPage/dataFakers";
import {
  NewLeaveAction,
  NewLeaveEntitlements,
  NewLeaveRequest,
} from "@support/leavePage/createDataTypes";
import {
  getLeaveAction,
  getLeaveEntitlements,
  getLeaveRequest,
} from "@support/leavePage/dataFakers";
import leavePageAssertions from "../../../pageObjects/leavePage/leavePageAssertions";

const employeeDataUtil = new employeeDataUtils();
const userDataUtil = new userDataUtils();
const leaveDataUtil = new leaveDataUtils();
const leaveAssertion = new leavePageAssertions();
const employee: NewEmployee = getEmployee();
const user: NewUser = {
  ...getUser(),
  empNumber: 7,
};
const leaveEntitlements: NewLeaveEntitlements = {
  ...getLeaveEntitlements(),
  empNumber: 7,
};
const leaveRequest: NewLeaveRequest = {
  ...getLeaveRequest(),
};
const leaveAction: NewLeaveAction = {
  ...getLeaveAction(),
};
let id = 0;
let employeeRes;
beforeEach(() => {
  employeeDataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});
Given("The system has an Employee with Login Details", () => {
  employeeDataUtil
      .createNewEmployee(employee)
      .then((res) => {
        userDataUtil.createNewUser({
          ...user,
          empNumber: res.body.data.empNumber,
        }).then((res) => {
          employeeRes = res
        })
      })
})
Given("The employee has number of entitlement", () => {
    leaveDataUtil.createNewLeaveEntitlements({
      ...leaveEntitlements,
      empNumber: employeeRes.body.data.employee.empNumber,
    });

  cy.logout();
})
When("The employee login to the system", () => {
  cy.login("Cypress test T", "strongPassword@123456");
})
When("The employee requests a leave day in the future", () => {
  leaveDataUtil.createNewLeaveRequest({...leaveRequest}).then((res) => {
    id = res.body.data.id;
  })
  cy.logout();
})
When("The admin login to the system", () => {
  cy.login();
})
When("The admin approves the leave request", () => {
  leaveDataUtil.createLeaveRequestAction({...leaveAction}, id);
  cy.logout();
})
When("The employee Opens the My Leave page", () => {
  cy.intercept("/web/index.php/api/v2/leave/leave-requests***").as("leave-requests")
  cy.intercept("/web/index.php/api/v2/leave/leave-periods***").as("leave-periods")
  cy.intercept("/web/index.php/api/v2/leave/workweek***").as("workweek")
  cy.intercept("/web/index.php/api/v2/leave/leave-types/*").as("leave-types")
  cy.intercept("/web/index.php/api/v2/leave/holidays***").as("holidays")
  cy.visit("/leave/viewMyLeaveList")
  cy.wait(["@leave-requests","@leave-periods","@workweek","@leave-types","@holidays"])
})
Then("The leave should exist in the records table with status Scheduled", () => {
  leaveDataUtil.getLeaveRequestByStatus().then((res) => {
    leaveAssertion.checkLeaveRequestIsApprove(res.body.data, id);
  });

});
afterEach(() => {
  employeeDataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});