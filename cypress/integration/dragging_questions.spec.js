describe('This file contains all tests related to dragging questions', () => {
    beforeEach(() => {
        cy.visit("/")

    });
    const dropzone = 'div[id="dropzone"]';
    // IMPORTANT: do not let your cursor go on the screen while the test is running it may interrupt with the dragging

    it('How a user would drag a number question', () => {
        const radio = '#radio';
        cy.dragAndDrop(radio, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled radio");
    });
    it('How a user would drag a checkbox question', () => {
        const checkbox = '#checkbox';
        cy.dragAndDrop(checkbox, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled checkbox");
    });
    it('How a user would drag a range question', () => {
        const range = '#range';
        cy.dragAndDrop(range, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled range");
    });
    it('How a user would drag a likert question', () => {
        const likert = '#likert';
        cy.dragAndDrop(likert, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled likert");
    });
    it('How a user would drag a textarea question', () => {
        const textarea = '#textarea';
        cy.dragAndDrop(textarea, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled textarea");
    });
    it('How a user would drag a number question', () => {
        const number = '#number';
        cy.dragAndDrop(number, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled number");
    });
    it('How a user would drag a date question', () => {
        const date = '#date';
        cy.dragAndDrop(date, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled date");
    });
    it('How a user would drag a time question', () => {
        const time = '#time';
        cy.dragAndDrop(time, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled time");
    });
    it('How a user would drag a textfield question', () => {
        const textfield = '#textfield';
        cy.dragAndDrop(textfield, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled textfield");
    });
    it('How a user would drag a drawing question', () => {
        const drawing = '#drawing';
        cy.dragAndDrop(drawing, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled drawing");
    });
    it('How a user would drag a dropdown question', () => {
        const dropdown = '#dropdown';
        cy.dragAndDrop(dropdown, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "untitled dropdown");
    });
    it('How a user would drag a raw question', () => {
        const raw = '#raw';
        cy.dragAndDrop(raw, dropzone, 0, 0);
        cy.get('div[id="1"]').should('have.text', "This is an untitled raw question");
    });

});
