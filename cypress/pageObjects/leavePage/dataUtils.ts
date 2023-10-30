import {
  createNewLeaveEntitlementsBody,
  leaveRequestActionStatusBody,
  createNewLeaveRequestBody,
} from "@support/leavePage/constants";
import {
  LeaveAction,
  NewLeaveEntitlements,
  NewLeaveRequest,
} from "@support/leavePage/createDataTypes";

export default class LeaveDataUtils {
  createNewLeaveEntitlements(leave: NewLeaveEntitlements) {
    cy.request({
      method: "POST",
      url: "/api/v2/leave/leave-entitlements",
      body: createNewLeaveEntitlementsBody(leave),
    });
  }
  createNewLeaveRequest(leave: NewLeaveRequest) {
    return cy.request({
      method: "POST",
      url: "api/v2/leave/leave-requests",
      body: createNewLeaveRequestBody(leave),
    });
  }
  setLeaveRequestActionStatusByLeaveId(leaveId: number, action: LeaveAction) {
    return cy.request({
      method: "PUT",
      url: `api/v2/leave/employees/leave-requests/${leaveId}`,
      body: leaveRequestActionStatusBody(action),
    });
  }
}
