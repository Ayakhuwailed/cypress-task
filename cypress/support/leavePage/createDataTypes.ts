export interface NewLeaveEntitlements {
  empNumber: number;
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  entitlement: string;
}

export interface NewLeaveRequest {
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  comment?: string;
  duration: {
    type: string;
  };
  partialOption: string;
}
export interface NewLeaveAction {
  action: string;
}
