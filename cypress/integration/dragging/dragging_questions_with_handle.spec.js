describe('This file contains all tests related to dragging questions', () => {
    beforeEach(() => {
        cy.visit("/")

    });
    // IMPORTANT: do not let your cursor go on the screen while the test is running it may interrupt with the dragging
    const dropzone = '#dropzone';
    it('How a user would drag a a question using a handle', () => {
        cy.dragFromSidebar('radio');
        cy.get('div[id="1"]').invoke('text').then((previousText) => {
            // const previousQuestionTwoTitle = cy.get('div[id="2"]').invoke('text')
            const raw = '[data-cy=draghandle2]';
            cy.dragAndDrop(raw, dropzone, 0, 0);
            cy.wait(2000);
            cy.get('div[id="1"]').invoke('text').should((updatedText) => {
                expect(previousText).not.eq(updatedText)
                // expect(updatedText).eq(previousQuestionTwoTitle)
            })
        })
    });

});
