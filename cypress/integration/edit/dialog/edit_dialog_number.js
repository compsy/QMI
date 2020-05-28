describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a number question', () => {
        cy.cancelEditDialog('number');
    });
    it('This test shows how a user would edit the title of a number question', () => {
        cy.editTitle('number');
    });
    it('This test shows how a user would toggle the visibility of a number question to be hidden', () => {
        cy.hideQuestion('number');
    });
    it('How a user would double tap on a title of a number question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('number');
    });
    it('How a user would double tap on a title of a number question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('number');
    });
    it('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('number');
    });
    it('How a user would select this type of question to set required question end as true ', () => {
        cy.enableRequiredProperty('number');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('number');
    });
});

