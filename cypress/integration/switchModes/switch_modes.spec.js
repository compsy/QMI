describe('This file contains all tests related to switching dark/light mode of the application', () => {
    beforeEach(() => {
        cy.visit("/")
    });

    it('How a user would click on question mark', () => {
        cy.get('[mode=light]');
        cy.get('[data-cy=darkModeSwitcher]')
            .click({force: true});
        cy.get('[mode=dark]');
        cy.get('[data-cy=darkModeSwitcher]')
            .click({force: true});
        cy.get('[mode=light]');
    });

});
