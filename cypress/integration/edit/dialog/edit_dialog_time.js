describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it', () => {
        cy.cancelEditDialog('time');
    });
    it('How a user would cancel the edit dialog after opening it', () => {
        cy.editTitle('time');
    });
});

