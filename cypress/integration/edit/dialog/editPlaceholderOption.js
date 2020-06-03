describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user change the placeholder text of a date question', () => {
        const placeholder = 'placeholder';
        const fullplaceholderProperty = `"${placeholder}":`;
        cy.get('#jsonText').contains(`${fullplaceholderProperty}"${placeholder}"`).should('not.exist');
        cy.dragFromSidebar('date');
        cy.openEditDialog();
        cy.get('[data-cy=placeholder]').click().type(placeholder);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('#jsonText').contains(`${fullplaceholderProperty}"${placeholder}"`)
    });
});

