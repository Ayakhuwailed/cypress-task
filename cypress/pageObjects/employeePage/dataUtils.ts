import {NewEmployee} from "@support/createDataTypes";
import {EmployeeData} from "@support/types";

export default class DataUtils {
    createEmployee(employee:NewEmployee) {
        return cy.request({
            method: 'POST', url: '/api/v2/pim/employees', body:employee
        }).then((res) : number=>{
            return res.body.data.empNumber
        });
    }

    deleteEmployee(ids: number[]) {
        cy.request({
            method: 'DELETE', url: '/api/v2/pim/employees',
            body: {ids}
        })
    }

    getEmployeeByEmployeeId(id: string): Cypress.Chainable<EmployeeData[]> {
        return cy.request(`/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${id}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`).then((res) => res.body.data)
    }
}