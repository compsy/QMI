describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a raw question', () => {
        cy.cancelEditDialog('raw');
    });
    it('This test shows how a user would edit the title of a raw question', () => {
        cy.dragFromSidebar('raw');
        const newTitle = "new test title";
        cy.get('[data-cy=edit1]')
            .click({force: true});
        cy.get('[data-cy="content<p>This is an untitled raw question</p>"]')
            .click({force: true})
            .type('{selectall}')
            .type(`<h1>${newTitle}</h1>`);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('.MuiTypography-root > h1')
            .should('have.text', newTitle);
    });
});

