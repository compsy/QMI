describe('This file contains all tests related to the Scroll to top button which appears when a questionaaire ' +
    'starts increasing in length', () => {
    beforeEach(() => {
        cy.visit("/")
    });
    it('How a user would scroll to the top after clicking the Scroll to top button', () => {
        const delta = 40;
        const startingScrollLength = 0;
        const lengthAfterDuplicatingQuestion = 480;
        const halfASecond = 500;
        cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(startingScrollLength, delta);
        });
        cy.get('[data-cy=duplicateNaN]').click({force: true})
        cy.scrollTo('bottom')
        cy.window().then(($window) => {
            expect($window.scrollY).to.be.closeTo(lengthAfterDuplicatingQuestion, delta);
        });
        cy.get('[data-cy=scrollToTop]').click()
        cy.wait(halfASecond);
        cy.window().then(($window) => {
            expect($window.scrollY).to.be.equal(startingScrollLength)
        });
    });
});
