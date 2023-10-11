export default class employeeActions {
    navigateToAddEmployeePage() {
        cy.visit('/pim/addEmployee')
    }

    fillAddEmployeeInputs() {
        cy.get('[name="firstName"]').type('test')
        cy.get('[name="middleName"]').type('test')
        cy.get('[name="lastName"]').type('test')
        cy.get('.oxd-grid-2.orangehrm-full-width-grid').find('input').clear().type('415')

    }

    clickOnSaveButton() {
        cy.get('[type="submit"]').click()
    }
    getId(){
       return   cy.url().then((url):number => {
             const id=parseInt(url.split('/').pop());
             return id
        });

    }


}