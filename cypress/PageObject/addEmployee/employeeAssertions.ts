export default class employeeAssertions {
    successfullyAddedToast() {
        cy.get('.oxd-toast--success')
        cy.get('.oxd-toast-content-text').contains('Success')
        cy.location('pathname', {timeout: 60000})
            .should('include', '/pim/viewPersonalDetails/empNumber/');
    }

    // employeeDetails(id: number) {
    //     return cy.request({
    //         method: 'GET', url: `/api/v2/pim/employees/${id}/personal-details`,
    //
    //     }).then(res => {
    //         expect(res.body.data.employeeId).to.eq('415')
    //         expect(res.body.data.firstName).to.eq('test')
    //         expect(res.body.data.middleName).to.eq('test')
    //         expect(res.body.data.lastName).to.eq('test')
    //         cy.log(res.body.data.employeeId)
    //     })
    // }

}