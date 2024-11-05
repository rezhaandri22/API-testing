/// <reference types="cypress" />

import { response } from 'express';

// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// @ts-ignore
Cypress.Commands.add('resetUsers', () => {
  cy.request('DELETE', '/auth/reset');
});

//@ts-ignore
Cypress.Commands.add('badRequest', (response, messages = []) => {
  expect(response.status).to.eq(400);
  expect(response.body.error).to.eq('Bad Request');
  messages.forEach((message) => {
    expect(message).to.be.oneOf(response.body.message);
  });
});

// @ts-ignore
Cypress.Commands.add('unauthorized', (response: any) => {
  expect(response.status).to.eq(401);
  expect(response.body.message).to.eq('Unauthorized');
});

//@ts-ignore
Cypress.Commands.add('checkUnauthorized', (method, url) => {
  cy.request({
    method: method,
    url: url,
    headers: {
      authorization: null,
    },
    failOnStatusCode: false,
  }).then((response) => {
    cy.unauthorized(response);
  });
});

Cypress.Commands.add('login', () => {
  const userData = {
    name: 'John Doe',
    email: 'johnp@nest.test',
    password: 'Secret_123',
  };
  cy.resetUsers();

  cy.request({
    method: 'POST',
    url: '/auth/register',
    body: userData,
  });
  cy.request({
    method: 'POST',
    url: '/auth/login',
    body: {
      email: userData.email,
      password: userData.password,
    },
  }).then((response) => {
    Cypress.env('token', response.body.data.access_token);
  });
});
