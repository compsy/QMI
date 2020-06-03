describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('This test shows how a user would toggle the visibility of a likert question to be hidden', () => {
        cy.hideQuestion('likert');
    });
    it('This test shows how a user would change the text of a likert question certain option', () => {
        cy.changeOptionOfItem('likert');
    });
    it('How a user would double tap on a title of a likert question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('likert');
    });
    it('How a user would double tap on a title of a likert question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('likert');
    });
    it('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('likert');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('likert');
    });
});

