describe('Contact Us Page', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/contact-us');
  });

  it('should display the heading', () => {
    cy.get('[data-testid="contactUsHeading"]').should('be.visible');
  });

  it('should display the content', () => {
    cy.get('[data-testid="contactUsContent"]').should('be.visible');
  });
});
