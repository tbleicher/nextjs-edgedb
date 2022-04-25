/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

import * as helpers from './helpers';

Given("I visit the {string} page", helpers.openPage);

Then("I should see a {string} heading", (text) => helpers.findHeading(text));

Then("I should see the {string} dialog", (text) => helpers.findModal(text));

When("I log in as {string}", (email) => cy.login(email, "password"));
