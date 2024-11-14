Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Vitor') 
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('vitor@gmail.com')
    cy.get('#phone').type('92984576442')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()
})