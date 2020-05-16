describe('This file contains all tests related to editing a question title', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would edit a title with a change', () => {
        const newTitleText = "I_wonder_if_this_test_will_pass?";
        cy.get('div[id="1"]')
            .dblclick();
        cy.get('input[id="title"]')
            .type('{selectall}')
            .type(newTitleText)
            .type('{enter}');
        cy.get('div[id="1"]').should('have.text', newTitleText)
    });

    it('How a user would attempt to edit a title of a question but not make any change', () => {
        cy.get('div[id="1"]').invoke('text').then((previousText) => {

            cy.get('div[id="1"]')
                .dblclick();
            cy.get('input[id="title"]')
                .type('{enter}');

            cy.get('div[id="1"]').invoke('text').should((updatedText) => {
                expect(previousText).to.eq(updatedText)
            })
        })
    });
});
