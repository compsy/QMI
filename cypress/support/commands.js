// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('dragAndDrop', (subject, target, dragIndex, dropIndex) => {
    cy.get(subject).should('be.visible', { timeout: 20000 })
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;
    cy.get(target)
        .eq(dropIndex)
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .eq(dragIndex)
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        }).wait(1000);
                    cy.get('body')
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true
                        })
                        .trigger('mouseup');
                });
        });
});
Cypress.Commands.add('dragFromSidebar', (itemToDrag) => {
    const dropzone = 'div[id="dropzone"]';
    let output = null;
    cy.dragAndDrop('#' + itemToDrag, dropzone, 0, 0);
    if (itemToDrag !== "raw") {
        output = `untitled ${itemToDrag}`
    } else {
        output = `This is an untitled raw question`
    }
    cy.get('div[id="1"]').should('have.text', output);
});

Cypress.Commands.add('cancelEditDialog', (itemToDrag) => {
    cy.dragFromSidebar(itemToDrag);
    if (itemToDrag !== "raw") {
        cy.get('div[id="1"]')
            .click();
    }
    cy.get('[data-cy=edit1]')
        .click({force: true});
    cy.get('[data-cy=cancel1]')
        .click();
});

Cypress.Commands.add('editTitle', (itemToDrag) => {
    cy.dragFromSidebar(itemToDrag);
    const newTitle = "new test title";
    cy.get('div[id="1"]')
        .click();
    cy.get('[data-cy=edit1]')
        .click({force: true});
    cy.get('#title')
        .click({force: true})
        .type('{selectall}')
        .type(newTitle);
    cy.get('[data-cy=submit1]')
        .click();
    cy.get('div[id="1"]')
        .should('have.text', newTitle);
});
Cypress.Commands.add('hideQuestion', (itemToDrag) => {
    cy.dragFromSidebar(itemToDrag);
    cy.get('[data-cy=notHiddenBadge1]');
    cy.get('div[id="1"]')
        .click();
    cy.get('[data-cy=edit1]')
        .click();
    cy.get('input[name="hidden"]')
        .click({force: true});
    if (itemToDrag === "drawing") {
        cy.setRequiredDrawingProperties()
    }
    cy.get('[data-cy=submit1]')
        .click();
    cy.get('[data-cy=hiddenBadge1]')
});

Cypress.Commands.add('setRequiredDrawingProperties', () => {
    cy.get('#drawingWidth')
        .click({force: true})
        .type('400');
    cy.get('#drawingHeight')
        .click({force: true})
        .type('400');
    cy.get('#image')
        .click({force: true})
        .type('blank.png');
});

Cypress.Commands.add('changeOptionOfItem', (itemToDrag) => {

    let questionToGetOption, editedOption = null;
    if (itemToDrag !== "range") {
        questionToGetOption = '[data-cy="question1option 1"]';
        editedOption = '[data-cy="test option"]'
    } else {
        questionToGetOption = editedOption = '[data-cy=question1] > .MuiSlider-root > .MuiSlider-markLabelActive';
    }

    cy.dragFromSidebar(itemToDrag);
    const newOption = "test option";
    cy.get('div[id="1"]')
        .click()
    cy.get(questionToGetOption)
        .invoke('text')
        .should('not.eq', newOption)
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
        .get(editedOption).should('have.text', newOption);
});

Cypress.Commands.add('deleteAnOption', (itemToDrag) => {
    cy.dragFromSidebar(itemToDrag);
    const option3 = "option 3";
    cy.get('div[id="1"]')
        .click()
        .get(`div[id="${option3}"]`).should('have.text', option3);
    cy.get('div[id="optionPanel0"]').children().contains("option 3")
    cy.get('[data-cy=edit1]')
        .click();
    cy.get('[data-cy=delete3]')
        .click({force: true});
    cy.get('[data-cy=submit1]')
        .click();
    cy.get('div[id="1"]')
        .click();
    cy.get('div[id="optionPanel0"]').children().should('have.length', 3)
    cy.get('div[id="optionPanel0"]').contains(option3).should('not.exist')
});

Cypress.Commands.add('doubleQuestionClickToEditTitle', (itemToDrag) => {
    cy.dragFromSidebar(itemToDrag);
    const newTitleText = `I wonder if this test for ${itemToDrag} question will pass?`;
    cy.get('div[id="1"]')
        .dblclick();
    cy.get('input[id="title"]')
        .type('{selectall}')
        .type(newTitleText)
        .type('{enter}');
    cy.get('div[id="1"]').should('have.text', newTitleText)
});

Cypress.Commands.add('doubleQuestionClickToEditTitleWithoutChange', (itemToDrag) => {
    cy.dragFromSidebar(itemToDrag);
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

