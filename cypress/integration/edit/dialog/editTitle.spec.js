describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('This test shows how a user would edit the title of a specific question', () => {
        const questionTypes = ['checkbox', 'date', 'dropdown', 'likert', 'number', 'radio', 'range',
            'textarea', 'textfield', 'time'];
        for (let i = 0; i < questionTypes.length; i++) {
            cy.editTitle(questionTypes[i]);
        }
    });
    it('This test shows how a user would edit the title of a drawing question', () => {
        cy.dragFromSidebar('drawing');
        const newTitle = "new test title";
        cy.openEditDialog();
        cy.get('#title')
            .click({force: true})
            .type('{selectall}')
            .type(newTitle);
        cy.setRequiredDrawingProperties()
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .should('have.text', newTitle);
    });
    it('This test shows how a user would edit the title of a raw question', () => {
        cy.dragFromSidebar('raw');
        const newTitle = "new test title";
        cy.get('[data-cy=edit1]')
            .click({force: true});
        cy.get('[data-cy="content<p>This is an untitled raw question</p>"]')
            .click({force: true})
            .type('{selectall}')
            .type(`<h1>${newTitle}</h1>`);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('.MuiTypography-root > h1')
            .should('have.text', newTitle);
    });
});

