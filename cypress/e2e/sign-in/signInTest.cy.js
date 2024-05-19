import sinon from 'sinon';
const { MailSlurp } = require('mailslurp-client');

describe('Nonexisting user sign in functionality', () => {
    beforeEach(() => {
        cy.visit('/signin'); // Replace '/signin' with the actual route for your Sign In page
    });

    it('Check all elements render', () => {
        // Assert email input field exists and is visible
        cy.get('#email').should('be.visible');

        // Assert password input field exists and is visible
        cy.get('#password').should('be.visible');

        // Assert submit button exists and is visible
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('Signing in with no account', () => {
        cy.get('#email').type('email@gmail.com');
        cy.get('#password').type("111111")
        cy.get('button[type="submit"]').click();
        cy.get('#signInError').should('be.visible');
        cy.get('#signInError').should('have.text', "Sorry it looks like you don't have an account with us. Please sign up first");
        cy.contains('a', 'sign up').click();
        cy.url().should('include', '/signup');
    });
});

describe('Sign up user', () => {
    let mailslurp;
    let inbox;
    before(async () => {
        cy.visit('/signup');
        mailslurp = new MailSlurp({ apiKey: Cypress.env('CYPRESS_MAILSLURP_API_KEY') });
        inbox = await mailslurp.getInbox('5b8a22ae-6623-4a33-8a7c-ab56bd5d19f3');
    })

    it('Sign up new user', async () => {
        cy.get('#firstName').type('user1');
        cy.get('#lastName').type('test');
        cy.get('#email').type(String(inbox.emailAddress));
        cy.get('#password').type('111111');
        cy.get('#confirmPassword').type('111111');
        cy.get('button[type="submit"]').click();
        const mail = await mailslurp.waitForLatestEmail(inbox.id, 30_000);

    })
});