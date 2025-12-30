describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should display hero title and content', () => {
    cy.get('[data-testid="heroTitle"]').contains('SantaMatch').should('be.visible');
    cy.get('[data-testid="heroDescription"]')
      .contains(
        'Secret Santa made easy! Add participants, set a budget, share the link, and let the gifting begin! No accounts required.'
      )
      .should('be.visible');
  });

  it('should render the main image', () => {
    cy.get('img[alt="Santa holding finger to mouth, indicating secret"]').should('be.visible')
  });

  it('should render all "How SantaMatch Works" items', () => {
    const items = [
      'Create Group',
      'Share Group Link',
      'View Match',
      'Let the gifting begin!',
    ];

    cy.get('[data-testid="howItWorksTitle"]').contains('How SantaMatch Works').should('be.visible');
    cy.get('[data-testid="howItWorksItems"] > div').should('have.length', 4);

    items.forEach((item) => {
      cy.get('[data-testid="howItWorksItems"]').contains(item).should('be.visible');
    });
  });

  it('navigates to /create-group from both CTAs', () => {
    cy.contains('button', 'Get Started!').click();
    cy.url().should('include', '/create-group');
    
    cy.go('back');
    cy.contains('button', 'Get Started Now!').click();
    cy.get('h1').should('be.visible'); 
  });
});