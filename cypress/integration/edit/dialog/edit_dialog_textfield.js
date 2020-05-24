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
    it('How a user would double tap on a title of a textfield question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('textfield');
    });
    it('How a user would double tap on a title of a textfield question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('textfield');
    });
    it.only('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('textfield');
    });
});

