describe('This file contains all tests related to the erase questionnaire button to clear out the working page if needed', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would delete a Questionnaire when they click yes', () => {
        cy.get('#eraseQuestionnaire')
            .click();
        cy.get('#yesToDelete')
            .click();
        cy.get('#jsonText')
            .should('have.text','[]')
        // cy.get('div[id="number"]').move({ x: 100, y: 100 })
    });
    it('How a user would delete a Questionnaire when they click no', () => {
        cy.get('#jsonText').invoke('text').then((previousText) => {
            cy.get('#eraseQuestionnaire')
                .click();
            cy.get('#noToDelete').click();
            cy.get('#jsonText').invoke('text').should((updatedText) => {
                expect(previousText).to.eq(updatedText)
            })
        })
    });
});
