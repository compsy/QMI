describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it', () => {
        cy.cancelEditDialog('drawing');
    });
    it('How a user would cancel the edit dialog after opening it', () => {
        cy.dragFromSidebar('drawing');
        const newTitle = "new test title";
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=edit1]')
            .click({force: true});
        cy.get('#title')
            .click({force: true})
            .type('{selectall}')
            .type(newTitle);
        cy.setRequiredDrawingProperties()
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .should('have.text', newTitle);
    });
    it('This test shows how a user would toggle the visibility of a drawing question to be hidden', () => {
        cy.hideQuestion('drawing');
    });
});

