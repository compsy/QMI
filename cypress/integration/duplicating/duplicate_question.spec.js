describe('This file contains all tests related to how a question can be duplicated', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel and edit dialog with no change being made', () => {

    });

    it.only('How a user would attempt to duplicated the second question', () => {
        cy.get('#jsonText').invoke('text').then((previousText) => {
            cy.get('div[id="2"]')
                .click();
            cy.get('[data-cy=duplicate2]')
                .click();
            cy.get('#jsonText').invoke('text').should((updatedText) => {
                expect(previousText).not.eq(updatedText)
            });

            const questionType1 = '{"id":"v1","type":"range","title":"Hello BOI","labels":["option 1","option 2","option 3","option 4","option5"]},';
            const questionType2 = `,"type":"radio","title":"Hello Kitty","options":["option 1","option 2","option 3","option 4"]}`;
            const updatedJson = `[${questionType1}{"id":"v2"${questionType2},{"id":"v3"${questionType2}]`;
            cy.get('#jsonText').should('have.text', updatedJson);
        })
    });

});
