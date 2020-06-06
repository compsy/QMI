describe('This file contains all tests related to switching dark/light mode of the application', () => {
    beforeEach(() => {
        cy.visit("/")
    });

    const XOffset = 25;
    const YOffset = 0;

    it('How a user would click on question mark', () => {
        cy.get('[data-cy=light]')
            .should('exist');
        cy.get('[data-cy=sidebar]')
            .click();
        cy.get('[data-cy=darkModeSwitcher]')
            .click(XOffset, YOffset);
        cy.get('[mode=dark]')
            .should('exist');
        cy.get('[data-cy=sidebar]')
            .click();
        cy.get('[data-cy=darkModeSwitcher]')
            .click();
        cy.get('[mode=light]')
            .should('exist');
    });

});
