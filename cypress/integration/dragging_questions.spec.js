
describe('This file contains all tests related to dragging questions', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    // IMPORTANT: do not let your cursor go on the screen while the test is running it may interrupt with the dragging
    it('How a user would delete a Questionnaire when they click yes', () => {
        const number = 'div[id="number"]';
        const radio = 'div[id="radio"]';
        const dropzone = 'div[id="dropzone"]';
        cy.dragAndDrop(number, dropzone, 0,0);
        cy.dragAndDrop(radio, dropzone, 0,0);
        cy.get('div[id="1"]').should('have.text',"untitled radio");
        cy.get('div[id="2"]').should('have.text',"untitled number");
    });
});
