describe('Downsample images', () => {
  it('successfully downsamples an image', () => {
    cy.visit('http://localhost:8080/')
    cy.readFile('cthead1.png', null).then(headBuffer => {
      cy.get('input[type=file]').selectFile({
        contents: headBuffer,
        fileName: 'cthead1.png',
      })
      cy.get('textarea').contains('"imageType"')
    })
  })

  it('successfully downsamples a label image', () => {
    cy.visit('http://localhost:8080/')
    cy.readFile('cthead1-bin.png', null).then(headBuffer => {
      cy.get('input[type=checkbox]').check()
      cy.get('input[type=file]').selectFile({
        contents: headBuffer,
        fileName: 'cthead1-bin.png',
      })
      cy.get('textarea').contains('"imageType"')
    })
  })
})
