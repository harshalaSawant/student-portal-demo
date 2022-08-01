describe('GradesDashboardComponent', () => {
  beforeEach(() => {
    switch(Cypress.currentTest.title) {
      case 'retain changes after save and navigation':
        cy.go('back');
        break;
      default:
        cy.visit('/');
        break;
    }
  })
  it('has the correct title', () => {
    cy.title().should('equal', 'Student Portal')
  });
  it('navigate to gradeDetail page on chart click', () => {
    cy.get('canvas').click().url().should('contain', '/gradesDetail');
  });
  it('after navigation gradesDetail page should have populated table', () => {
    cy.get('canvas').click().get('table').get('tbody tr td').should('exist').should('have.length.above', 0);
  });
  it('clicking on table cell allows data editing and saving', () => {
    cy.get('canvas').click().get('table').get('tbody tr td')
    .first().next().click().clear().type('New Name')
    .get('input').should('have.value', 'New Name')
    .get('button[type="submit"]').click();
  });
  it('retain changes after save and navigation', () => {
    cy.get('canvas').click().get('table').get('tbody tr td')
    .first().next().get('input').should('have.value', 'New Name');
  });
})
