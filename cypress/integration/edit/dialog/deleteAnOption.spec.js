describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a specific question', () => {
        const questionTypes = ['checkbox', 'radio'];
        //write tests for range and dropdown also
        for (let i = 0; i < questionTypes.length; i++) {
            cy.deleteAnOption(questionTypes[i]);
        }
    });
    it('How a user would delete an option of a range question', () => {
        cy.dragFromSidebar('range');
        const option3 = "option 3";
        cy.get('div[id="1"]')
            .click()
            .get('[data-cy=question1]').contains(option3);
        cy.get('[data-cy=edit1]')
            .click();
        cy.get('[data-cy=delete3]')
            .click({force: true});
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=question1]').contains(option3).should('not.exist');
    });
    it('How a user would delete an option of a dropdown question', () => {
        cy.dragFromSidebar('dropdown');
        const option3 = "option 3";
        cy.get('div[id="1"]')
            .click()
        cy.get('#demo-controlled-open-select').click()
            .get('#menu-').children().should('have.length', 4).get('[data-value="3"]').should('have.text', option3)
            .click();
        cy.get('[data-cy=edit1]')
            .click();
        cy.get('[data-cy=delete3]')
            .click({force: true});
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .click();
        cy.get('#demo-controlled-open-select').click().get('#menu-')
            .contains(option3).should('not.exist')
    });
});

