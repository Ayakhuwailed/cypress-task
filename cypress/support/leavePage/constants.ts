import {
  NewLeaveAction,
  NewLeaveEntitlements,
  NewLeaveRequest,
} from "@support/leavePage/createDataTypes";

export const createNewLeaveEntitlementsBody = (leave: NewLeaveEntitlements) => {
  return {
    ...leave,
  };
};

export const createNewLeaveRequestBody = (leave: NewLeaveRequest) => {
  return {
    ...leave,
    comment: leave.comment || null,
  };
};
export const createNewLeaveRequestActionBody = (action: NewLeaveAction) => {
  return {
    ...action,
  };
};
