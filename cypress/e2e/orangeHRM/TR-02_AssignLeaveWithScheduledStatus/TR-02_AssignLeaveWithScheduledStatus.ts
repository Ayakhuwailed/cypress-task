import { Then } from "@badeball/cypress-cucumber-preprocessor";
import dataUtils from "../../../pageObjects/employeePage/dataUtils";
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

const dataUtil = new dataUtils();
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
beforeEach(() => {
  dataUtil.deleteEmployeeByEmployeeId(employee.employeeId);
});

Then("Assign leave with Scheduled Status", () => {
  dataUtil
    .createNewEmployee(employee)
    .then((res) => {
      userDataUtil.createNewUser({
        ...user,
        empNumber: res.body.data.empNumber,
      });
    })
    .then((res) => {
      leaveDataUtil.createNewLeaveEntitlements({
        ...leaveEntitlements,
        empNumber: res.body.data.employee.empNumber,
      });
    })
    .then(() => {
      cy.logout();
    })
    .then(() => {
      cy.login("Cypress test T", "strongPassword@123456");
    })
    .then((res) => {
      leaveDataUtil.createNewLeaveRequest({ ...leaveRequest }).then((res) => {
        id = res.body.data.id;
      });
    })
    .then(() => {
      cy.logout();
    })
    .then(() => {
      cy.login();
    })
    .then(() => {
      leaveDataUtil.createLeaveRequestAction({ ...leaveAction }, id);
    })
    .then(() => {
      cy.logout();
    })
    .then(() => {
      cy.login("Cypress test T", "strongPassword@123456");
    })
    .then(() => {
      leaveDataUtil.getLeaveRequestByStatus().then((res) => {
        leaveAssertion.checkLeaveRequestIsApprove(res.body.data, id);
      });
    });
});
