describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a specific question', () => {
        const questionTypes = ['checkbox', 'likert', 'radio', 'range'];
        for (let i = 0; i < questionTypes.length; i++) {
            cy.changeOptionOfItem(questionTypes[i]);
        }
    });
    it('This test shows how a user would change the text of a dropdown question certain option', () => {
        cy.dragFromSidebar('dropdown');
        const newOption = "test option";
        cy.get('div[id="1"]')
            .click()
        cy.get('#demo-controlled-open-select').click()
        cy.get('[data-value="1"]').invoke('text').should('not.eq', newOption)
        cy.get('[data-value="1"]')
            .click()
        cy.get('[data-cy=edit1]')
            .click();
        cy.get('#option-1')
            .click({force: true})
            .type('{selectall}')
            .type(newOption);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .click()
        cy.get('#demo-controlled-open-select').click()
            .get('[data-value="1"]').should('have.text', newOption);
    });
});

