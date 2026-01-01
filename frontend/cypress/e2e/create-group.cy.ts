describe('Create Group Page', () => {
    beforeEach(() => {
      cy.visit('localhost:3000/create-group');
    });
  
    it('should display the create group form', () => {
      cy.get('[data-testid="createGroupForm"]').should('be.visible');
      cy.contains('Create Group').should('be.visible');
    });
  
    it('should have group name input field', () => {
      cy.get('[data-testid="groupNameInput"]')
        .should('be.visible')
        .and('have.attr', 'placeholder');
    });
  
    it('should have budget input field', () => {
      cy.get('[data-testid="budgetInput"]')
        .should('be.visible')
    });
  
    it('should have participant input fields', () => {
      cy.get('[data-testid^="participantInput"]').should('have.length.at.least', 1);
    });
  
    it('should add a new participant when clicking add button', () => {
      cy.get('[data-testid^="participantInput"]').then(($inputs) => {
        const initialCount = $inputs.length;
        
        cy.get('[data-testid="addParticipantBtn"]').click();
        
        cy.get('[data-testid^="participantInput"]').should('have.length', initialCount + 1);
      });
    });
  
    it('should remove a participant when clicking remove button', () => {
      cy.get('[data-testid="addParticipantBtn"]').click();
      cy.get('[data-testid="addParticipantBtn"]').click();
      
      cy.get('[data-testid^="participantInput"]').then(($inputs) => {
        const initialCount = $inputs.length;
        
        cy.get('[data-testid^="removeParticipantBtn"]').first().click();
        
        cy.get('[data-testid^="participantInput"]').should('have.length', initialCount - 1);
      });
    });
  
    it('should validate required fields before submission', () => {
      cy.get('[data-testid="createGroupBtn"]').click();
      cy.url().should('include', '/create-group');
    });
  
    it('should create group with valid data', () => {
      cy.get('[data-testid="groupNameInput"]').type('Office Secret Santa 2024');
      cy.get('[data-testid="budgetInput"]').type('25');
      
      cy.get('[data-testid="participantInput-0"]').type('John');
      cy.get('[data-testid="participantInput-1"]').type('Bob');
      
      cy.get('[data-testid="participantInput-2"]').type('Charlie');
      
      cy.get('[data-testid="createGroupBtn"]').click();
      cy.get('[data-testid="loadingMsg"]').should('be.visible');
    });

    it('should create group with valid data and exclusions', () => {
        cy.get('[data-testid="groupNameInput"]').type('Office Secret Santa 2024');
        cy.get('[data-testid="budgetInput"]').type('25');
        
        cy.get('[data-testid="participantInput-0"]').type('John');
        cy.get('[data-testid="exclusionInput-0"]').type('Bob');
        cy.get('[data-testid="participantInput-1"]').type('Bob');
        
        cy.get('[data-testid="participantInput-2"]').type('Charlie');
        
        cy.get('[data-testid="createGroupBtn"]').click();
        cy.get('[data-testid="loadingMsg"]').should('be.visible');
    });

    it('should create group with invalid exclusions', () => {
        cy.get('[data-testid="groupNameInput"]').type('Office Secret Santa 2024');
        cy.get('[data-testid="budgetInput"]').type('25');
        
        cy.get('[data-testid="participantInput-0"]').type('John');
        cy.get('[data-testid="exclusionInput-0"]').type('Alice');
        cy.get('[data-testid="participantInput-1"]').type('Bob');
        
        cy.get('[data-testid="participantInput-2"]').type('Charlie');
        
        cy.get('[data-testid="createGroupBtn"]').click();
        cy.get('[data-testid="loadingMsg"]').should('be.visible');
    });
  
    it('should validate minimum number of participants', () => {
      cy.get('[data-testid="groupNameInput"]').type('Small Group');
      cy.get('[data-testid="budgetInput"]').type('20');
      cy.get('[data-testid="participantInput-0"]').type('John');
      
      cy.get('[data-testid="createGroupBtn"]').click();
      cy.url().should('include', '/create-group');
    });
  
    it('should prevent duplicate participant names', () => {
      cy.get('[data-testid="groupNameInput"]').type('Duplicate Group');
      cy.get('[data-testid="participantInput-0"]').type('John');
      cy.get('[data-testid="participantInput-1"]').type('John');
      cy.get('[data-testid="participantInput-2"]').type('Becky');
      cy.get('[data-testid="createGroupBtn"]').click();
      cy.contains('Participants must have unique names within a group.').should('be.visible');
      cy.get('[data-testid="errorMsg"]').should('be.visible'); 
    });
  });