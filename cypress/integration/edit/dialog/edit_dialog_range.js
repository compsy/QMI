describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a range question', () => {
        cy.cancelEditDialog('range');
    });
    it('This test shows how a user would edit the title of a range question', () => {
        cy.editTitle('range');
    });
    it('This test shows how a user would toggle the visibility of a range question to be hidden', () => {
        cy.hideQuestion('range');
    });
});

