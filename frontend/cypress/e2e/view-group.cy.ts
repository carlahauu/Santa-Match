describe('View Group Page', () => {
  it('should display error message when viewing invalid group', () => {
    cy.visit('http://localhost:3000/view-group/randomToken');
    cy.get('[data-testid="errorMsg"]').should('be.visible');
  });

  it('should create group and display group data', () => {
    cy.visit('http://localhost:3000/create-group');
    cy.get('[data-testid="groupNameInput"]').type('Office Secret Santa 2024');
    cy.get('[data-testid="budgetInput"]').type('25');

    cy.get('[data-testid="participantInput-0"]').type('John');
    cy.get('[data-testid="participantInput-1"]').type('Bob');

    cy.get('[data-testid="participantInput-2"]').type('Charlie');

    cy.get('[data-testid="createGroupBtn"]').click();
    cy.get('[data-testid="loadingMsg"]').should('be.visible');
    cy.url().should('include', '/view-group');

    cy.contains('Office Secret Santa 2024').should('be.visible');
    cy.contains('Budget: $25').should('be.visible');
    cy.contains('Total Participants: 3').should('be.visible');
    cy.contains('Copy the link below').should('be.visible');
    cy.get('[data-testid="copyLinkBtn"]').click();
    cy.contains('Link Copied!').should('be.visible');
    cy.get('[data-testid="groupLink"]').should('be.visible');
    cy.get('[data-testid="copyLinkBtn"]').should('be.visible');
    cy.get('[data-testid="participants"]').should('be.visible');
    cy.get('[data-testid="participants"]').children().should('have.length', 3);
    cy.get('[data-testid^="viewStatus-"]').each(($section) => {
      cy.wrap($section).should('be.visible');
    });
    cy.get('[data-testid^="viewStatus-"] button').first().click();
    cy.get('[data-testid="viewMatchModal"]').should('be.visible');
    cy.contains('No, go back').click();
    cy.get('[data-testid="viewMatchModal"]').should('not.exist');
    cy.get('[data-testid^="viewStatus-"] button').first().click();
    cy.contains('Yes').click();
    cy.url().should('include', '/reveal');
    cy.go('back');
    cy.contains('Already Viewed').should('be.visible');
  });

  it('should create group with no budget', () => {
    cy.visit('http://localhost:3000/create-group');
    cy.get('[data-testid="groupNameInput"]').type('Office Secret Santa 2024');

    cy.get('[data-testid="participantInput-0"]').type('John');
    cy.get('[data-testid="participantInput-1"]').type('Bob');

    cy.get('[data-testid="participantInput-2"]').type('Charlie');

    cy.get('[data-testid="createGroupBtn"]').click();
    cy.get('[data-testid="loadingMsg"]').should('be.visible');
    cy.url().should('include', '/view-group');

    cy.contains('No Budget').should('be.visible');
  });
});
