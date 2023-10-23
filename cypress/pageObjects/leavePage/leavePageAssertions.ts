export default class LeavePageAssertions {
  checkLeaveRequestIsApprove(fromDate, toDate) {
    cy.get(".oxd-table-row")
        .should("contain", fromDate)
        .should("contain",toDate)
        .should("contain", "Scheduled");
  }
}
