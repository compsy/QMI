describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a time question', () => {
        cy.cancelEditDialog('time');
    });
    it('This test shows how a user would edit the title of a time question', () => {
        cy.editTitle('time');
    });
    it('How a user would double tap on a title of a time question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('time');
    });
    it('How a user would double tap on a title of a time question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('time');
    });
});

