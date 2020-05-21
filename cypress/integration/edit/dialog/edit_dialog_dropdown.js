describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would cancel the edit dialog after opening it for a dropdown question', () => {
        cy.cancelEditDialog('dropdown');
    });
    it('This test shows how a user would edit the title of a dropdown question', () => {
        cy.editTitle('dropdown');
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
    // it.only('How a user would delete an option of a question', () => {
    //     // cy.deleteAnOption('dropdown');
    //     cy.dragFromSidebar('dropdown');
    //     const option3 = "option 3";
    //     cy.get('div[id="1"]')
    //         .click()
    //     cy.get('#demo-controlled-open-select').click()
    //         .get(`div[id="${option3}"]`).should('have.text', option3);
    //     cy.get('#menu-').children().should('have.length', 4)
    //
    //     cy.get('[data-cy=edit1]')
    //         .click();
    //     cy.get('[data-cy=delete3]')
    //         .click({force: true});
    //     cy.get('[data-cy=submit1]')
    //         .click();
    //     cy.get('div[id="1"]')
    //         .click();
    //     // cy.get('div[id="optionPanel0"]').children().should('have.length', 3)
    //     // cy.get('div[id="optionPanel0"]').contains(option3).should('not.exist')
    // });
});

