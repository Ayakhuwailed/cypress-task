import { createNewEmployeeBody } from "@support/employeePage/constants";
import { NewEmployee } from "@support/employeePage/createDataTypes";
import { EmployeeData } from "@support/employeePage/types";

export default class DataUtils {
    createNewEmployee(employee: NewEmployee) {
        return this.getEmployeeByEmployeeId(employee.employeeId).then((emp) => {
            this.deleteEmployeeByEmployeeId(emp.employeeId);
            return cy.request({
                method: "POST",
                url: "/api/v2/pim/employees",
                body: createNewEmployeeBody(employee),
            });
        });
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

    getEmployeeByEmployeeId(id: string): Cypress.Chainable<EmployeeData> {
        return cy
            .request(
                `/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${id}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`
            )
            .then((res) => {
                return res.body.data;
            });
    }
}
