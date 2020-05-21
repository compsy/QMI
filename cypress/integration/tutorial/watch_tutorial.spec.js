describe('This file contains all tests related to watching the tutorial functionality', () => {
    beforeEach(() => {
        cy.visit("/")
    });

    it('How a user would click on question mark', () => {
            cy.get('[data-cy=openTutorial]')
                .click({force: true});
            cy.get('[data-cy=openTutorial]')
                .click({force: true});
    });
});
