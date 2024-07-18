describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT")
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pulvinar", 10)

    cy.get('#firstName').type("Camila")
    cy.get('#lastName').type("Teste")
    cy.get('#email').type("camila@teste.com")
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get(".success").should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type("Camila")
    cy.get('#lastName').type("Teste")
    cy.get('#email').type("camila@teste,com")
    cy.get('#open-text-area').type("Mensagem para teste")
    cy.contains('button', 'Enviar').click()

    cy.get(".error").should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type("abcde")
      .should("have.value", "")
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type("Camila")
    cy.get('#lastName').type("Teste")
    cy.get('#email').type("camila@teste,com")
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type("Mensagem para teste")
    cy.contains('button', 'Enviar').click()

    cy.get(".error").should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type("Camila")
      .should('have.value', "Camila")
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type("Teste")
      .should('have.value', "Teste")
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type("camila@teste.com")
      .should('have.value', "camila@teste.com")
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type("998765544")
      .should('have.value', "998765544")
      .clear()
      .should('have.value', '')
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get(".error").should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: "Ana",
      lastName: "Silva",
      email: "ana@teste.com",
      text: "Mensagem de teste."
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get(".success").should('be.visible')
  });
})