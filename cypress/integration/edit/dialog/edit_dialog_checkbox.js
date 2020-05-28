describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a checkbox question', () => {
        cy.cancelEditDialog('checkbox');
    });
    it('This test shows how a user would edit the title of a checkbox question', () => {
        cy.editTitle('checkbox');
    });
    it('This test shows how a user would toggle the visibility of a checkbox question to be hidden', () => {
        cy.hideQuestion('checkbox');
    });
    it('This test shows how a user would change the text of a checkbox question certain option', () => {
        cy.changeOptionOfItem('checkbox');
    });
    it('How a user would delete an option of a checkbox question', () => {
        cy.deleteAnOption('checkbox');
    });
    it('How a user would double tap on a title of a checkbox question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('checkbox');
    });
    it('How a user would double tap on a title of a checkbox question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('checkbox');
    });
    it('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('checkbox');
    });
    it('How a user would select this type of question to set required question end as true ', () => {
        cy.enableRequiredProperty('checkbox');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('checkbox');
    });


});

