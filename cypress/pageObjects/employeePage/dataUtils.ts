import { createNewEmployeeBody } from "@support/employeePage/constants";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { EmployeeResponseData } from "@support/employeePage/types";

export default class EmployeeDataUtils {
  createNewEmployee(employee: NewEmployee): Cypress.Chainable<number> {
    return this.getEmployeeByEmployeeId(employee.employeeId).then(
      (emp): Cypress.Chainable<number> => {
        this.deleteEmployeeByEmployeeId(emp.employeeId);
        return cy
          .request({
            method: "POST",
            url: "/api/v2/pim/employees",
            body: createNewEmployeeBody(employee),
          })
          .then((res) => {
            return res.body.data.empNumber;
          });
      }
    );
  }

  deleteEmployeeByEmployeeId(id: string) {
    this.getEmployeeByEmployeeId(id).then((res) => {
      if (Array.isArray(res) && res.length === 0) {
        return;
      } else {
        cy.request({
          method: "DELETE",
          url: "/api/v2/pim/employees",
          body: { ids: [res[0].empNumber] },
        });
      }
    });
  }

  getEmployeeByEmployeeId(id: string): Cypress.Chainable<EmployeeResponseData> {
    return cy
      .request(
        `/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${id}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`
      )
      .then((res) => {
        return res.body.data;
      });
  }
}
