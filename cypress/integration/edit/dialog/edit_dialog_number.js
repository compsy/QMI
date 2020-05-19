describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it', () => {
        cy.cancelEditDialog('number');
    });
    it('How a user would cancel the edit dialog after opening it', () => {
        cy.editTitle('number');
    });
    it('This test shows how a user would toggle the visibility of a number question to be hidden', () => {
        cy.hideQuestion('number');
    });
});

