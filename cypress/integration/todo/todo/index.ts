/// <reference types="cypress" />

import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { findHeading, findModal, openPage } from "../../step_definitions";

Given("I visit the {string} page", openPage);

Then("I should see a {string} heading", (text) => findHeading(text));

Then("I should see the {string} dialog", (text) => findModal(text));

When("I log in as {string}", (email) => cy.login(email, "password"));
