import "@testing-library/cypress/add-commands";
import "cypress-file-upload";
import "cypress-wait-until";

declare global {
  namespace Cypress {
    interface Chainable {}
  }
}
