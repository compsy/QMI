describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });

    it('This test shows how a user would edit the title of a checkbox question', () => {
        const questionTypes = ['checkbox', 'date', 'dropdown', 'likert', 'number', 'radio', 'range',
            'textarea', 'textfield', 'time'];
        for (let i = 0; i < questionTypes.length; i++) {
            cy.editTitle(questionTypes[i]);
        }
    });
});

