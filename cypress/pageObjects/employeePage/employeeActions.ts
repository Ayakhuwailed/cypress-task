export default class employeeActions {
    navigateToAddEmployeePage() {
        cy.visit('/pim/addEmployee')
    }

    fillAddEmployeeInputs() {
        cy.get('[name="firstName"]').type('aya')
        cy.get('[name="lastName"]').type('khuwailed')
        cy.get('.oxd-grid-2.orangehrm-full-width-grid').find('input').clear().type('1234')

    }

    clickOnSaveButton() {
        cy.get('[type="submit"]').click()
    }
    getId(){
       return   cy.url().then((url):string => {
             const id=url.split('/').pop();
             return id
        });

    }


}