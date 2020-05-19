describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a likert question', () => {
        cy.cancelEditDialog('likert');
    });
    it('This test shows how a user would edit the title of a likert question', () => {
        cy.editTitle('likert');
    });
    it('This test shows how a user would toggle the visibility of a likert question to be hidden', () => {
        cy.hideQuestion('likert');
    });
    it.only('This test shows how a user would change the text of a likert question certain option', () => {
        cy.changeOptionOfItem('likert');
    });

});

