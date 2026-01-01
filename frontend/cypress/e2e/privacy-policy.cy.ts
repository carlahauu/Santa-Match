describe('Privacy Policy Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/privacy-policy');
  });

  it('displays the Privacy Policy heading', () => {
    cy.get('[data-testid="privacyPolicyHeading"]')
      .should('be.visible')
      .and('contain.text', 'Privacy Policy');
  });

  it('displays all privacy policy sections', () => {
    cy.get('[data-testid="privacyPolicyContent"]')
      .children()
      .should('have.length.at.least', 1);
  });

  it('displays the effective date', () => {
    cy.contains('Effective Date: December 30, 2025').should('be.visible');
  });

  it('shows the information collection section', () => {
    cy.contains('Information Collection And Use').should('be.visible');

    cy.contains('SantaMatch values your privacy').should('be.visible');
  });

  it('lists third-party services', () => {
    cy.contains('Third-Party Hosting and Services').should('be.visible');

    cy.contains('Vercel for the frontend').should('be.visible');
    cy.contains('Render for the backend').should('be.visible');
    cy.contains('Neon for database').should('be.visible');
  });

  it('shows contact email', () => {
    cy.contains('carlahau110@gmail.com').should('be.visible');
  });

  it('persists layout across screen sizes', () => {
    const viewports = ['iphone-xr', 'macbook-13'];

    viewports.forEach((vp) => {
      cy.viewport(vp);

      // Check heading
      cy.get('[data-testid="privacyPolicyHeading"]').should('be.visible');

      // Check main content
      cy.get('[data-testid="privacyPolicyContent"]').should('be.visible');

      // Check all sections
      cy.get('[data-testid^="privacyPolicyContent-"]').each(($section) => {
        cy.wrap($section).should('be.visible');
      });
    });
  });
});
