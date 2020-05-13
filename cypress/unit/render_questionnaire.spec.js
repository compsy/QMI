describe('This file contains all tests related to rendering a questionaaire (the tests for the RESTapi are done by the client)', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it.only('How a user would edit a title with a change', () => {
        cy.get('div[id="renderQuestionnaire"]')
            .click();
    });
});
