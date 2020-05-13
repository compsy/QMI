import '@4tw/cypress-drag-drop'

describe('Login', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would delete a Questionnaire when they click yes', () => {
        cy.get('div[id="eraseQuestionnaire"]')
            .click();
        cy.get('button[id="yesToDelete"]')
            .click();
        cy.get('p[id="jsonText"]')
            .should('have.text','[]')
        // cy.get('div[id="number"]').move({ x: 100, y: 100 })
    });
});
