describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would set a specific hoursFrom, hoursTo and hoursStep for a time question', () => {
        const hoursFrom = 'hours_from';
        const hoursTo = 'hours_to';
        const hoursStep = 'hours_step';
        const hoursFromProperty = `"${hoursFrom}":`;
        const hoursStepProperty = `"${hoursStep}":`;
        const hoursToProperty = `"${hoursTo}":`;
        cy.changePropertyOptions('time', hoursFrom, hoursTo, hoursStep, hoursFromProperty, hoursToProperty, hoursStepProperty)
    });
});

