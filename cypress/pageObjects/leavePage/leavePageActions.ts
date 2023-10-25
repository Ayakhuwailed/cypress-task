export default class LeavePageActions {
  openLeavePage() {
    cy.intercept("/web/index.php/api/v2/leave/leave-requests***").as(
      "leave-requests"
    );
    cy.intercept("/web/index.php/api/v2/leave/leave-periods***").as(
      "leave-periods"
    );
    cy.intercept("/web/index.php/api/v2/leave/workweek***").as("workweek");
    cy.intercept("/web/index.php/api/v2/leave/leave-types/*").as("leave-types");
    cy.intercept("/web/index.php/api/v2/leave/holidays***").as("holidays");
    cy.visit("/leave/viewMyLeaveList");
    cy.wait([
      "@leave-requests",
      "@leave-periods",
      "@workweek",
      "@leave-types",
      "@holidays",
    ]);
  }
  getHeaderIndex(headerName:string){
    return cy.get(".oxd-table-header").children().first().contains("[role=columnheader]", headerName).invoke("index")
  }
}
