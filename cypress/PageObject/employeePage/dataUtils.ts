export default class DataUtils{
    addEmployeeReq() {
        return cy.request({
            method: 'POST', url: '/api/v2/pim/employees', body:
                {
                    empPicture: null,
                    employeeId: "415",
                    firstName: "test",
                    lastName: "test",
                    middleName: "test"
                }
        }).then((res) : number=>{
            return res.body.data.empNumber
        });
    }
    deleteEmployeeReq(ids:number[]) {
        cy.request({
            method: 'DELETE', url: '/api/v2/pim/employees',
            body: {ids}
        })
    }

    getEmployeeByEmployeeId(id){
        cy.request(`/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${id}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`).then((res)=>{
            cy.log(res.body)
        })

    }
}