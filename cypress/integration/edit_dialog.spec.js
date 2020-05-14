describe('This file contains all tests related to editing a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel and edit dialog with no change being made', () => {
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=editv1]')
            .click();
        cy.get('[data-cy=cancelv1]')
            .click();
    });
    it('How a user would edit a title using the edit dialog', () => {
        const newTitle = "new test title";
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=editv1]')
            .click();
        cy.get('#title')
            .click({force: true})
            .type('{selectall}')
            .type(newTitle);
        cy.get('[data-cy=submitv1]')
            .click();
        cy.get('div[id="1"]')
            .should('have.text', newTitle);
    });
    it('How a user would make sure a non hidden question becomes hidden', () => {
        cy.get('[data-cy=notHiddenBadgev1]');
        cy.get('div[id="1"]')
            .click();
        cy.get('[data-cy=editv1]')
            .click();
        cy.get('input[name="hidden"]')
            .click();
        cy.get('[data-cy=submitv1]')
            .click();
        cy.get('[data-cy=hiddenBadgev1]')

    });
    it.only('How a user would change the text of a certain option', () => {
        const newOption = "test option";
        cy.get('div[id="2"]')
            .click();
        cy.get('[data-cy=editv2]')
            .click();
        cy.get('#option-1')
            .click({force: true})
            .type('{selectall}')
            .type(newOption);
        cy.get('[data-cy=submitv2]')
            .click();
        cy.get('div[id="2"]')
            .click()
            .get('[data-cy="test option"]').should('have.text', newOption);

    });
});
