/// <reference types="cypress" />

const URLS: Record<string, string> = {
  home: "http://localhost:3000",
  todos: "http://localhost:3000/todo",
};

export function findHeading(text: string, level = "h1") {
  cy.contains(level, text).should("be.visible");
}

export function findModal(text: string) {
  cy.contains(".mantine-Modal-title", text).should("be.visible");
}

export function openPage(pageName: string) {
  const url = URLS[pageName.toLowerCase()];

  if (!url) {
    throw new Error(`'${pageName}' is not a supported page name`);
  }

  cy.visit(url);
}
