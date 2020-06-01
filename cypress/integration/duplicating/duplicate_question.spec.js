describe('This file contains all tests related to how a question can be duplicated', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel and edit dialog with no change being made', () => {

    });

    it.only('How a user would attempt to duplicated the second question', () => {
        cy.get('#jsonText').invoke('text').then((previousText) => {
            cy.get('div[id="1"]')
                .click();
            cy.get('[data-cy=duplicateNaN]')
                .click({force: true});
            cy.get('#jsonText').invoke('text').should((updatedText) => {
                expect(previousText).not.eq(updatedText)
            });
            const questionv1 = '{"type":"raw","content":"<h4>Welcome to your new questionnaire!</h4>\\n<p class=\\"flow-text\\" style=\'font-size:medium;\'>Add questions by dragging a question type over here.</p>\\n<p class=\\"flow-text\\" style=\'font-size:medium;\'>Double click a question title to edit the title.</p>\\n<p class=\\"flow-textext\\" style=\'font-size:medium;\'>Click a question header to show details.</p>\\n<p class=\\"flow-textext\\" style=\'font-size:medium;\'>Click render questionnaire to see the final output</p>\\n"}'
            const updatedJson = `[${questionv1},${questionv1}]`;
            cy.get('#jsonText').should('have.text', updatedJson);
        })
    });

});
