describe('This file contains all tests related to the erase questionnaire button to clear out the working page if needed', () => {
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
    it('How a user would delete a Questionnaire when they click no', () => {
        cy.get('p[id="jsonText"]').invoke('text').then((previousText) => {
            cy.get('div[id="eraseQuestionnaire"]')
                .click();
            cy.get('button[id="noToDelete"]').click();
            cy.get('p[id="jsonText"]').invoke('text').should((updatedText) => {
                expect(previousText).to.eq(updatedText)
            })
        })
    });
});
