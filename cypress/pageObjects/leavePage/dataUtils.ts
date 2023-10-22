import {
  createNewLeaveEntitlementsBody,
  createNewLeaveRequestActionBody,
  createNewLeaveRequestBody,
} from "@support/leavePage/constants";
import {
  NewLeaveAction,
  NewLeaveEntitlements,
  NewLeaveRequest,
} from "@support/leavePage/createDataTypes";

export default class DataUtils {
  createNewLeaveEntitlements(leave: NewLeaveEntitlements) {
    cy.request({
      method: "POST",
      url: "/api/v2/leave/leave-entitlements",
      body: createNewLeaveEntitlementsBody(leave),
    })
  }
  createNewLeaveRequest(leave: NewLeaveRequest) {
    return cy.request({
      method: "POST",
      url: "api/v2/leave/leave-requests",
      body: createNewLeaveRequestBody(leave),
    });
  }
  createLeaveRequestAction(action: NewLeaveAction, requestId: number) {
    return cy.request({
      method: "PUT",
      url: `api/v2/leave/employees/leave-requests/${requestId}`,
      body: createNewLeaveRequestActionBody(action),
    });
  }
  getLeaveRequestByStatus() {
    return cy.request({
      method: "GET",
      url: `/api/v2/leave/leave-requests?limit=50&offset=0&fromDate=2023-01-01&toDate=2024-08-24&includeEmployees=onlyCurrent&statuses[]=2`,
    });
  }
}
