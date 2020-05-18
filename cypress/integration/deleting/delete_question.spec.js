describe('This file contains all tests related to deleting a question ', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would attempt to delete the first question', () => {
        const previousLength = 2;
        const list = 'div[id="dropzone"]';
        cy.get(list).children().should('have.length', previousLength);
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=removev1]')
            .click();
        cy.get(list).children().should('have.length', previousLength - 1)
    });
});
