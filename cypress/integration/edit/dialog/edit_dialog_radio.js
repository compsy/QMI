describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('This test shows how a user would toggle the visibility of a radio question to be hidden', () => {
        cy.hideQuestion('radio');
    });
    it('This test shows how a user would change the text of a radio question certain option', () => {
        cy.changeOptionOfItem('radio');
    });
    it('How a user would delete an option of a radio question', () => {
        cy.deleteAnOption('radio');
    });
    it('How a user would double tap on a title of a radio question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('radio');
    });
    it('How a user would select this type of question to select section end as true ', () => {
        cy.enableSectionEnd('radio');
    });
    it('How a user would select this type of question to set required question end as true ', () => {
        cy.enableRequiredProperty('radio');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('radio');
    });
});

