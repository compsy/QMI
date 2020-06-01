describe('This file contains all tests related to landing page', () => {
    beforeEach(() => {
        cy.visit("/")
    });


    it('How a user would attempt to transit to landing page and back to the editor', () => {
        cy.get('[data-cy=sidebar]')
            .click({force: true});
        cy.get('[data-cy=homeIcon]')
            .click({force: true});
        cy.get('[data-cy=landingPage]')
            .should('exist');
        cy.get('[data-cy=sidebar]')
            .click({force: true});
        cy.get('[data-cy=editIcon]')
            .click({force: true});
        cy.get('[data-cy=questionsPage]')
            .should('exist');
    });
});
