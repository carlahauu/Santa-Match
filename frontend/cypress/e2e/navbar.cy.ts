describe('Navbar', () => {
  const navItems = ['Create Group', 'View Match'];

  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should display navbar with logo and nav items', () => {
    cy.get('[data-testid="navbar"]')
      .should('be.visible')
      .within(() => {
        cy.contains('SantaMatch').should('be.visible');
        navItems.forEach((item) => {
          cy.contains(item).should('be.visible');
        });
      });
  });

  it('should navigate to home when clicking logo', () => {
    cy.get('[data-testid="navbar"]').contains('Create Group').click();
    cy.url().should('include', '/create-group');

    cy.get('[data-testid="navbar"]').contains('SantaMatch').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should navigate between pages via navbar', () => {
    cy.get('[data-testid="navbar"]').contains('Create Group').click();
    cy.url().should('include', '/create-group');

    cy.get('[data-testid="navbar"]').contains('View Match').click();
    cy.url().should('include', '/view-match');

    cy.get('[data-testid="navbar"]').contains('Create Group').click();
    cy.url().should('include', '/create-group');
  });

  it('should persist navbar across pages', () => {
    cy.visit(`localhost:3000/create-group`);
    cy.get('[data-testid="navbar"]').should('be.visible');
    cy.get('[data-testid="navbar"]')
      .contains('SantaMatch')
      .should('be.visible');
  });

  it('is responsive and shows menu on mobile', () => {
    cy.viewport('iphone-xr');

    cy.contains('Create Group').should('not.be.visible');
    cy.contains('View Match').should('not.be.visible');
    cy.get('[data-testid="mobile-menu-button"]')
      .contains('Menu')
      .should('be.visible');
    cy.get('[data-testid="mobile-menu-button"]').click();
    cy.get('[data-testid="mobile-menu-button"]')
      .contains('Close')
      .should('be.visible');
    cy.get('[data-testid="mobile-navbar"]')
      .contains('Create Group')
      .should('be.visible');
    cy.get('[data-testid="mobile-navbar"]')
      .contains('View Match')
      .should('be.visible');
    cy.get('[data-testid="mobile-menu-button"]').click();
    cy.contains('Create Group').should('not.be.visible');
  });
});
