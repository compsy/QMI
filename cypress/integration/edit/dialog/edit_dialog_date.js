describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('This test shows how a user would toggle the visibility of a date question to be hidden', () => {
        cy.hideQuestion('date');
    });
    it('How a user would double tap on a title of a date question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('date');
    });
    it('How a user would double tap on a title of a date question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('date');
    });
    it('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('date');
    });
    it('How a user would select this type of question to set required question end as true ', () => {
        cy.enableRequiredProperty('date');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('date');
    });
    it('How a user change the placeholder text of a date question', () => {
        const placeholder = 'placeholder';
        const fullplaceholderProperty = `"${placeholder}":`;
        cy.get('#jsonText').contains(`${fullplaceholderProperty}"${placeholder}"`).should('not.exist');
        cy.dragFromSidebar('date');
        cy.openEditDialog();
        cy.get('[data-cy=placeholder]').click().type(placeholder);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('#jsonText').contains(`${fullplaceholderProperty}"${placeholder}"`)
    });
});

