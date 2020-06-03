describe('This file contains all tests related to deleting a question ', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would attempt to delete the a specific question', () => {
        const questionTypes = ['checkbox', 'date', 'drawing', 'dropdown', 'likert', 'number', 'radio', 'range', 'raw',
            'textarea', 'textfield', 'time']
        for (let i = 0; i < questionTypes.length; i++) {
            cy.dragAndDeleteQuestion(questionTypes[i]);
        }


    });

});
