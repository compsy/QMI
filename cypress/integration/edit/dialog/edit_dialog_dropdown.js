describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('This test shows how a user would toggle the visibility of a dropdown question to be hidden', () => {
        cy.hideQuestion('dropdown');
    });
    it('This test shows how a user would change the text of a dropdown question certain option', () => {
        cy.dragFromSidebar('dropdown');
        const newOption = "test option";
        cy.get('div[id="1"]')
            .click()
        cy.get('#demo-controlled-open-select').click()
        cy.get('[data-value="1"]').invoke('text').should('not.eq', newOption)
        cy.get('[data-value="1"]')
            .click()
        cy.get('[data-cy=edit1]')
            .click();
        cy.get('#option-1')
            .click({force: true})
            .type('{selectall}')
            .type(newOption);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .click()
        cy.get('#demo-controlled-open-select').click()
            .get('[data-value="1"]').should('have.text', newOption);

    });
    it('How a user would delete an option of a dropdown question', () => {
        // cy.deleteAnOption('dropdown');
        cy.dragFromSidebar('dropdown');
        const option3 = "option 3";
        cy.get('div[id="1"]')
            .click()
        cy.get('#demo-controlled-open-select').click()
            .get('#menu-').children().should('have.length', 4).get('[data-value="3"]').should('have.text', option3)
            .click();
        cy.get('[data-cy=edit1]')
            .click();
        cy.get('[data-cy=delete3]')
            .click({force: true});
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('div[id="1"]')
            .click();
        cy.get('#demo-controlled-open-select').click().get('#menu-')
            .contains(option3).should('not.exist')
    });
    it('How a user would double tap on a title of a dropdown question to make a change from the current title', () => {
        cy.doubleQuestionClickToEditTitle('dropdown');
    });
    it('How a user would double tap on a title of a dropdown question without making a change to the title', () => {
        cy.doubleQuestionClickToEditTitleWithoutChange('dropdown');
    });
    it('How a user would select this type of question to set section end as true ', () => {
        cy.enableSectionEnd('dropdown');
    });
    it('How a user would set the text of a certain tooltip for a specific question', () => {
        cy.enableToolTipText('dropdown');
    });
    it('How a user would set a label for a dropdown question', () => {
        const label = 'label';
        const fullLabelProperty = `"${label}":`;
        cy.get('#jsonText').contains(`${fullLabelProperty}"${label}"`).should('not.exist');
        cy.dragFromSidebar('dropdown');
        cy.openEditDialog();
        cy.get('[data-cy=label]').click().type(label);
        cy.get('[data-cy=submit1]')
            .click();
        cy.get('#jsonText').contains(`${fullLabelProperty}"${label}"`)
    });
});

