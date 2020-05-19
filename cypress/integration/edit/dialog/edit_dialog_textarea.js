describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a textarea question', () => {
        cy.cancelEditDialog('textarea');
    });
    it('This test shows how a user would edit the title of a textarea question', () => {
        cy.editTitle('textarea');
    });
    it('This test shows how a user would toggle the visibility of a textarea question to be hidden', () => {
        cy.hideQuestion('textarea');
    });
});

