import { getPrefix } from "@support/utils";
import {
  NewLeaveEntitlements,
  NewLeaveRequest,
} from "@support/leavePage/createDataTypes";
import moment from "moment";
export const getLeaveEntitlements = (
  prefix: string = getPrefix()
): NewLeaveEntitlements => {
  return {
    empNumber: 0,
    leaveTypeId: 8,
    fromDate: moment().format("YYYY-01-01"),
    toDate: moment().format("YYYY-12-31"),
    entitlement: "4",
  };
};
export const getLeaveRequest = (
  prefix: string = getPrefix()
): NewLeaveRequest => {
  return {
    leaveTypeId: 8,
    fromDate: moment().format("YYYY-MM-DD"),
    toDate: moment().add(3, "days").format("YYYY-MM-DD"),
    duration: {
      type: "half_day_morning",
    },
    partialOption: "all",
  };
};
