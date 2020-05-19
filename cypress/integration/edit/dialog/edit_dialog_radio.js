describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a radio question', () => {
        cy.cancelEditDialog('radio');
    });
    it('This test shows how a user would edit the title of a radio question', () => {
        cy.editTitle('radio');
    });
    it('This test shows how a user would toggle the visibility of a radio question to be hidden', () => {
        cy.hideQuestion('radio');
    });
    it.only('This test shows how a user would change the text of a radio question certain option', () => {
        cy.changeOptionOfItem('radio');
    });
});

