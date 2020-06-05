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
    it.only('How a user would attempt to delete the a specific question', () => {
        const list = 'div[id="dropzone"]';
        const previousLength = 1;
        cy.get(list).children().should('have.length', previousLength);
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=remove1]')
            .click();
        cy.get(list).children().should('have.length', previousLength - 1);
        cy.scrollTo(0, 0);
    });

});
