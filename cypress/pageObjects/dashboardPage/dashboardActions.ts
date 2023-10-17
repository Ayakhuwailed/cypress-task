export default class DashboardActions {
    navigateToDashPage() {
        cy.intercept("/web/index.php/api/v2/dashboard/employees/time-at-work**").as("time-at-work");
        cy.intercept("/web/index.php/api/v2/dashboard/employees/action-summary").as("action-summary");
        cy.intercept("/web/index.php/api/v2/dashboard/shortcuts").as("shortcuts");
        cy.intercept("/web/index.php/api/v2/buzz/**").as("feed-limit");
        cy.intercept("/web/index.php/api/v2/dashboard/employees/leaves**").as("leavesDate");
        cy.intercept("/web/index.php/api/v2/dashboard/employees/subunit").as("subunit");
        cy.intercept("/web/index.php/api/v2/dashboard/employees/locations").as("locations");
        cy.intercept("POST", "/web/index.php/events/push").as("push");

        cy.get('a[href="/web/index.php/dashboard/index"]').click();

        cy.wait([
            "@time-at-work",
            "@action-summary",
            "@shortcuts",
            "@feed-limit",
            "@leavesDate",
            "@subunit",
            "@locations",
            "@push",
        ]);
    }
}
