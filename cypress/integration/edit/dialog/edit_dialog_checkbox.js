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
    it.only('This test shows how a user would change the text of a checkbox question certain option', () => {
        cy.changeOptionOfItem('checkbox');
    });


});

