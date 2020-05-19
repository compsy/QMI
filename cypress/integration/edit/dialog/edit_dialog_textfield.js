describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a texfield question', () => {
        cy.cancelEditDialog('textfield');
    });
    it('This test shows how a user would edit the title of a textfield question', () => {
        cy.editTitle('textfield');
    });
    it('This test shows how a user would toggle the visibility of a texfield question to be hidden', () => {
        cy.hideQuestion('textfield');
    });
});

