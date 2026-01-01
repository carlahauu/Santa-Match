describe('Footer', () => {
  const footerItems = [
    'Privacy Policy',
    'Terms of Service',
    'Contact Us',
    'GitHub Repo',
    'Made with love by Carla Hau',
  ];

  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should display footer with footer items', () => {
    cy.get('[data-testid="footer"]')
      .should('be.visible')
      .within(() => {
        footerItems.forEach((item) => {
          cy.contains(item).should('be.visible');
        });
      });
  });

  it('should navigate between pages via footer', () => {
    cy.get('[data-testid="footer"]').contains('Privacy Policy').click();
    cy.url().should('include', '/privacy-policy');

    cy.get('[data-testid="footer"]').contains('Terms of Service').click();
    cy.url().should('include', '/terms-of-service');

    cy.get('[data-testid="footer"]').contains('Contact Us').click();
    cy.url().should('include', '/contact-us');

    cy.get('[data-testid="footer"]')
      .contains('GitHub Repo')
      .should('have.attr', 'href', 'https://github.com/carlahauu/Santa-Match');

    cy.get('[data-testid="footer"]')
      .contains('Carla Hau')
      .should('have.attr', 'href', 'https://carlahau.com');
  });

  it('should persist footer across pages', () => {
    cy.visit(`localhost:3000/create-group`);
    cy.get('[data-testid="footer"]').should('be.visible');
    cy.get('[data-testid="footer"]')
      .contains('Privacy Policy')
      .should('be.visible');
  });

  it('shows footer on mobile', () => {
    cy.viewport('iphone-xr');

    cy.get('[data-testid="footer"]')
      .should('be.visible')
      .within(() => {
        footerItems.forEach((item) => {
          cy.contains(item).should('be.visible');
        });
      });
  });
});
