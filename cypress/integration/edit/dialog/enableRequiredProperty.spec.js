describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a specific question', () => {
        const questionTypes = ['checkbox', 'date', 'number', 'radio'];
        for (let i = 0; i < questionTypes.length; i++) {
            cy.enableRequiredProperty(questionTypes[i]);
        }
    });
});


