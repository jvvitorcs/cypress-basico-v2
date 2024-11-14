// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test.'
        cy.get('#firstName').type('Vitor') 
        cy.get('#lastName').type('Correia')
        cy.get('#email').type('vitor@gmail.com')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const longtext = 'Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test.'
        cy.get('#firstName').type('Vitor') 
        cy.get('#lastName').type('Correia')
        cy.get('#email').type('vitor.gmail.com')
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
        .type('jasdoifhsaoidj')
        .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function() {
        const longtext = 'Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test, Test.'
        cy.get('#firstName').type('Vitor') 
        cy.get('#lastName').type('Correia')
        cy.get('#email').type('vitor@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longtext, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Verifica se campos obrigatórios foram apagados', function() {
        cy.get('#firstName').type('Vitor').should('have.value', 'Vitor').clear().should('have.value', '')
        cy.get('#lastName').type('Correia').clear().should('have.value', '')
        cy.get('#email').type('vitor@gmail.com').clear().should('have.value', '')
    })

    it('Exibe  mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Seleciona opção youtube no drop por seu texto', function() {        
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {        
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {  
        const OptionIndex = 1
        cy.get('#product').select(OptionIndex).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {  
        cy.get('input[type="radio"][value="feedback"').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {  
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    
    it('marca ambos checkboxes, depois desmarca o último', function() {  
            cy.get('#check input[type="checkbox"]').as('checkboxes').check()
            cy.get('@checkboxes').each(checkbox => {
            expect(checkbox[0].checked).to.equal(true)
        }).last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {  
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })    

    it('seleciona um arquivo simulando um drag-and-drop', function() {  
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    }) 

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {  
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        }) 
    })

    it ('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it ('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

})