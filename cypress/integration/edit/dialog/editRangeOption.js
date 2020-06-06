describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would set a specific min, max and step for a range question', () => {
        const maximum = 'max';
        const minimum = 'min';
        const step = 'step';
        const maximumProperty = `"${maximum}":`;
        const minimumProperty = `"${minimum}":`;
        const stepProperty = `"${step}":`;
        cy.changePropertyOptions('range', maximum, minimum, step, maximumProperty, minimumProperty, stepProperty);
    });
});
