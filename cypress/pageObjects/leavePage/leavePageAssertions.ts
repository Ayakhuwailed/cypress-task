export default class LeavePageAssertions {
  checkLeaveRequestIsApprove(res, id) {
    const filteredArray = res.filter((item) => item.id === id);
    cy.wrap(filteredArray).should("have.length.greaterThan", 0);
  }
}
