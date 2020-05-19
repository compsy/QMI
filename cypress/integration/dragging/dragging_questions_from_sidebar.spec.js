describe('This file contains all tests related to dragging questions', () => {
    beforeEach(() => {
        cy.visit("/")

    });
    // IMPORTANT: do not let your cursor go on the screen while the test is running it may interrupt with the dragging
    it('How a user would drag a radio question', () => {
        cy.dragFromSidebar('radio')
    });
    it('How a user would drag a checkbox question', () => {
        cy.dragFromSidebar('checkbox')
    });
    it('How a user would drag a range question', () => {
        cy.dragFromSidebar('range')
    });
    it('How a user would drag a likert question', () => {
        cy.dragFromSidebar('likert')
    });
    it('How a user would drag a textarea question', () => {
        cy.dragFromSidebar('textarea')
    });
    it('How a user would drag a number question', () => {
        cy.dragFromSidebar('number')
    });
    it('How a user would drag a date question', () => {
        cy.dragFromSidebar('date')
    });
    it('How a user would drag a time question', () => {
        cy.dragFromSidebar('time')
    });
    it('How a user would drag a textfield question', () => {
        cy.dragFromSidebar('textfield')
    });
    it('How a user would drag a drawing question', () => {
        cy.dragFromSidebar('drawing')
    });
    it('How a user would drag a dropdown question', () => {
        cy.dragFromSidebar('dropdown')
    });
    it('How a user would drag a raw question', () => {
        cy.dragFromSidebar('raw')
    });
});
