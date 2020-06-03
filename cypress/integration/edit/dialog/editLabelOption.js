describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would set a label for a dropdown question', () => {
        const label = 'label';
        const fullLabelProperty = `"${label}":`;
        cy.get('#jsonText').contains(`${fullLabelProperty}"${label}"`).should('not.exist');
        cy.dragFromSidebar('dropdown');
        cy.openEditDialog();
        cy.get('[data-cy=label]').click().type(label);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('#jsonText').contains(`${fullLabelProperty}"${label}"`)
    });
});

