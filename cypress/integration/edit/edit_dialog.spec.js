// describe('This file contains all tests related to edit a question through the edit dialog for each question', () => {
//     beforeEach(() => {
//         cy.visit("/")
//     });
//     it('How a user would change the text of a certain option', () => {
//         const newOption = "test option";
//         cy.get('div[id="2"]')
//             .click();
//         cy.get('[data-cy=editv2]')
//             .click();
//         cy.get('#option-1')
//             .click({force: true})
//             .type('{selectall}')
//             .type(newOption);
//         cy.get('[data-cy=submitv2]')
//             .click();
//         cy.get('div[id="2"]')
//             .click()
//             .get('[data-cy="test option"]').should('have.text', newOption);
//
//     });
//     it('How a user would delete an option of a question', () => {
//         const option3 = "option 3";
//         cy.get('div[id="2"]')
//             .click()
//             .get('div[id="option 3"]').should('have.text', option3);
//         cy.get('[data-cy=editv2]')
//             .click();
//         cy.get('[data-cy=v2delete3]')
//             .click({force: true});
//         cy.get('[data-cy=submitv2]')
//             .click();
//         cy.get('div[id="2"]')
//             .click();
//         cy.get(':nth-child(3)').should('not.have.value', option3);
//     });
// });
