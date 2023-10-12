import {NewEmployee} from "@support/employeePage/createDataTypes";
import {EmployeeData} from "@support/employeePage/types";
import {createNewEmployeeBody} from "@support/employeePage/constants";

export default class DataUtils {
    createNewEmployee(employee:NewEmployee) {
        return cy.request({
            method: 'POST', url: '/api/v2/pim/employees', body:createNewEmployeeBody(employee)
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