describe('View Match Page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/view-match');
  });

  it('should display the heading', () => {
    cy.get('[data-testid="viewMatchHeading"]').should('be.visible');
  });

  it('should display the content', () => {
    cy.get('[data-testid="viewMatchContent"]').should('be.visible');
  });

  it('should display the form', () => {
    cy.get('[data-testid="viewMatchForm"]').should('be.visible');
  });

  it('should validate required fields before submission', () => {
    cy.get('[data-testid="viewGroupBtn"]').click();
    cy.url().should('include', '/view-match');
  });

  it('should validate required URL before submission', () => {
    cy.get('[data-testid="viewMatchLink"]').type('invalid link');
    cy.get('[data-testid="viewGroupBtn"]').click();
    cy.contains(
      'Please enter a valid link. The link should look like https://santamatch.carlahau.com/view-group/randomToken'
    ).should('be.visible');
    cy.url().should('include', '/view-match');
  });

  it('should go to /view-group with proper link submitted', () => {
    cy.get('[data-testid="viewMatchLink"]').type(
      'https://santamatch.carlahau.com/view-group/randomToken'
    );
    cy.get('[data-testid="viewGroupBtn"]').click();
    cy.url().should('include', '/view-group');
  });

  it('persists across screen sizes', () => {
    cy.viewport('iphone-xr');
    cy.get('[data-testid="viewMatchHeading"]').should('be.visible');
    cy.get('[data-testid="viewMatchContent"]').should('be.visible');
    cy.get('[data-testid="viewMatchForm"]').should('be.visible');

    cy.viewport('macbook-13');

    cy.get('[data-testid="viewMatchHeading"]').should('be.visible');
    cy.get('[data-testid="viewMatchContent"]').should('be.visible');
    cy.get('[data-testid="viewMatchForm"]').should('be.visible');
  });
});
