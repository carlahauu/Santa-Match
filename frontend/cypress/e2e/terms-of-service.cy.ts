describe('Terms of Service Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/terms-of-service');
  });

  it('displays the Terms of Service heading', () => {
    cy.get('[data-testid="termsOfServiceHeading"]')
      .contains('Terms of Service')
      .should('be.visible');
  });

  it('displays all terms of service sections', () => {
    cy.get('[data-testid="termsOfServiceSections"]')
      .children()
      .should('have.length', 8);
  });

  it('displays the last updated date', () => {
    cy.get('[data-testid="termsOfServiceSectionContent-0"]')
      .contains('Last Updated: December 29, 2025')
      .should('be.visible');
  });

  it('displays acceptance of terms section', () => {
    cy.get('[data-testid="termsOfServiceSectionTitle-1"]')
      .contains('Acceptance of Terms')
      .should('be.visible');

    cy.get('[data-testid="termsOfServiceSectionContent-1"]')
      .contains('By accessing or using the SantaMatch website')
      .should('be.visible');
  });

  it('displays changes to terms section', () => {
    cy.get('[data-testid="termsOfServiceSectionTitle-2"]')
      .contains('Changes to Terms')
      .should('be.visible');

    cy.get('[data-testid="termsOfServiceSectionContent-2"]')
      .contains('We may update or modify these Terms at any time')
      .should('be.visible');
  });

  it('displays use of SantaMatch section', () => {
    cy.get('[data-testid="termsOfServiceSectionTitle-3"]')
      .contains('Use of SantaMatch')
      .should('be.visible');

    cy.get('[data-testid="termsOfServiceSectionContent-3"]')
      .contains('Reverse-engineer, decompile, or disassemble')
      .should('be.visible');
    cy.get('[data-testid="termsOfServiceSectionContent-3"]')
      .contains('Use the Service for illegal activities')
      .should('be.visible');
    cy.get('[data-testid="termsOfServiceSectionContent-3"]')
      .contains('Interfere with or disrupt the operation of the Service')
      .should('be.visible');
  });

  it('displays limitation of liability section', () => {
    cy.get('[data-testid="termsOfServiceSectionTitle-4"]').should(
      'contain.text',
      'Limitation of Liability'
    );

    cy.get('[data-testid="termsOfServiceSectionContent-4"]').should(
      'contain.text',
      'In no event shall SantaMatch and its creator(s) be liable'
    );
  });

  it('displays no warranties section', () => {
    cy.get('[data-testid="termsOfServiceSectionTitle-5"]').should(
      'contain.text',
      'No Warranties'
    );

    cy.get('[data-testid="termsOfServiceSectionContent-5"]').should(
      'contain.text',
      'SantaMatch is provided on an “as is” and “as available” basis'
    );
  });

  it('displays termination section', () => {
    cy.get('[data-testid="termsOfServiceSectionTitle-6"]').should(
      'contain.text',
      'Termination'
    );

    cy.get('[data-testid="termsOfServiceSectionContent-6"]').should(
      'contain.text',
      'We reserve the right to suspend or terminate access'
    );
  });

  it('displays contact email', () => {
    cy.get('[data-testid="termsOfServiceSectionContent-7"]').should(
      'contain.text',
      'carlahau110@gmail.com'
    );
  });

  it('persists across screen sizes', () => {
    cy.viewport('iphone-xr');
    cy.get('[data-testid="termsOfServiceHeading"]').should('be.visible');
    cy.get('[data-testid="termsOfServiceSections"]').should('be.visible');
    cy.get('[data-testid^="termsOfServiceContent-"]').each(($section) => {
      cy.wrap($section).should('be.visible');
    });

    cy.viewport('macbook-13');

    cy.get('[data-testid="termsOfServiceHeading"]').should('be.visible');
    cy.get('[data-testid="termsOfServiceSections"]').should('be.visible');
    cy.get('[data-testid^="termsOfServiceContent-"]').each(($section) => {
      cy.wrap($section).should('be.visible');
    });
  });
});
