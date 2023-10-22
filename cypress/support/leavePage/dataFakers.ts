import { getPrefix } from "@support/utils";
import {
  NewLeaveAction,
  NewLeaveEntitlements,
  NewLeaveRequest,
} from "@support/leavePage/createDataTypes";

export const getLeaveEntitlements = (
  prefix: string = getPrefix()
): NewLeaveEntitlements => {
  return {
    empNumber: 0,
    leaveTypeId: 8,
    fromDate: "2023-01-01",
    toDate: "2023-12-31",
    entitlement: "4",
  };
};
export const getLeaveRequest = (
  prefix: string = getPrefix()
): NewLeaveRequest => {
  return {
    leaveTypeId: 8,
    fromDate: "2023-10-23",
    toDate: "2023-10-26",
    duration: {
      type: "half_day_morning",
    },
    partialOption: "all",
  };
};
export const getLeaveAction = (
  prefix: string = getPrefix()
): NewLeaveAction => {
  return {
    action: "APPROVE",
  };
};
