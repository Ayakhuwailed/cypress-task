import LeavePageActions from "@pageObjects/leavePage/leavePageActions";

export default class LeavePageAssertions {
  leavePageActions = new LeavePageActions();
  checkLeaveRecordContainsValueInColumn(
    rowNumber: number,
    headerName: string,
    value: string | number,
    isExist: boolean
  ) {
    this.leavePageActions.getHeaderIndex(headerName).then((headerIndex) => {
      cy.get(".oxd-table-body")
        .find("div[role=row]")
        .eq(rowNumber)
        .find("div[role=cell]")
        .eq(headerIndex)
        .contains(value)
        .should(isExist ? "exist" : "not.exist");
    });
  }
}
