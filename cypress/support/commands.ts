// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

function getInputByLabel(label: string) {
  return cy
    .contains("label", label)
    .invoke("attr", "for")
    .then((id) => {
      cy.get("#" + id);
    }) as unknown as Cypress.Chainable<Element>;
}

Cypress.Commands.add("dataCy", function (value) {
  return cy.get(`[data-cy=${value}]`) as unknown as Cypress.Chainable<Element>;
});

Cypress.Commands.add("login", (email, password) => {
  cy.getInputByLabel("Email").type(email);
  cy.getInputByLabel("Password").type(password);
  cy.get("button").contains("Login").click();
});

Cypress.Commands.add("getInputByLabel", getInputByLabel);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export {};
