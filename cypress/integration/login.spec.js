// describe('Login', () => {
//     beforeEach(() => {
//         cy.visit("/")
//     });
//     it('How a user would login with the right credentials', () => {
//         cy.get('[data-cy=sidebar]').click({force: true});
//         cy.get('[data-cy=Login]').click({force: true});
//         cy.get('input[id="email"]').type("test@gmail.com")
//         cy.get('input[id="password"]').type("ohno")
//         cy.get('button[type="submit"]').click()
//     });
//     it('In case a user forgot the password', () => {
//         cy.get('button[type="button"]').click();
//         cy.get('input[id="email"]').type("test@gmail.com")
//         cy.get('button[type="submit"]').click()
//     });
//     it('How a user would fail a login without a password', () => {
//         cy.get('input[id="email"]')
//             .type("meint@reducept.com")
//         cy.get('button[type="submit"]')
//             .click()
//         cy.get('p[id="password-helper-text"]')
//             .should('have.text','The password field is required.')
//         cy.get('.MuiTypography-root.makeStyles-errorMessage-18.MuiTypography-body1.MuiTypography-colorSecondary')
//             .should('have.text','The given data was invalid.')
//     });
//     it('How a user would fail a login without a username', () => {
//         cy.get('input[id="password"]')
//             .type("test123")
//         cy.get('button[type="submit"]')
//             .click()
//         cy.get('p[id="email-helper-text"]')
//             .should('have.text','The username field is required.')
//         cy.get('error message')
//             .should('have.text','The given data was invalid.')
//     });
//     it('A user logging in without a username and password', () => {
//         cy.get('button[type="submit"]')
//             .click()
//         cy.get('p[id="password-helper-text"]')
//             .should('have.text','The password field is required.')
//         cy.get('p[id="email-helper-text"]')
//             .should('have.text','The username field is required.')
//         cy.get('.errorMessage')
//             .should('have.text','The given data was invalid.')
//     })
//
// });
