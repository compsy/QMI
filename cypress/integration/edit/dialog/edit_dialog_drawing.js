describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
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
    it('How a user would set the radius and density for a draw question', () => {
        const drawingRadius = 'radius';
        const drawingDensity = 'density';
        const fullDrawingRadiusProperty = `"${drawingRadius}":`;
        const fullDrawingDensityProperty = `"${drawingDensity}":`;

        cy.dragFromSidebar('drawing');
        const valueToType = 100;
        cy.openEditDialog();
        cy.setRequiredDrawingProperties();
        cy.replaceText(drawingRadius, valueToType);
        cy.replaceText(drawingDensity, valueToType)

        cy.get('[data-cy=submit1]')
            .click({force: true});

        cy.checkJsoncontains("shouldExist", fullDrawingRadiusProperty, fullDrawingDensityProperty, '"height":', valueToType, valueToType, 400)

    });
});

