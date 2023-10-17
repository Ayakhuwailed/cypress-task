export default class employeeActions {
    navigateToAddEmployeePage() {
        cy.intercept("/web/index.php/api/v2/pim/employees").as("employees");
        cy.intercept("/web/index.php/api/v2/admin/users").as("users");
        cy.visit("/pim/addEmployee");
        cy.wait(["@employees", "@users"]);
    }

    fillAddEmployeeInputs() {
        cy.get('[name="firstName"]').type("aya");
        cy.get('[name="lastName"]').type("khuwailed");
        cy.get(".oxd-grid-2.orangehrm-full-width-grid").find("input").clear().type("1234");
    }

    clickOnSaveButton() {
        cy.get('[type="submit"]').click();
    }

    getId() {
        return cy.url().then((url): string => {
            const id = url.split("/").pop();
            return id;
        });
    }
}
