/* eslint-disable jest/valid-expect-in-promise */
describe('As a user, I want to', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
    cy.intercept('/api/storage', {
      fixture: 'storage.json',
      statusCode: 200,
    }).as('getStorage')
    cy.intercept('/api/order', { fixture: 'success.json', statusCode: 200 }).as(
      'submitOrder'
    )
    cy.visit('http://localhost:3000')
  })

  /**
   * I want to see a list of all products the bakery offers.
   */
  it('see a list of all products the bakery offers', () => {
    cy.wait('@getStorage')
    cy.fixture('storage.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        cy.findByText(item.name).should('be.visible')
      })
    })
  })

  /**
   * For each product I want to see:
   * Product name
   * Product thumbnail
   * Product price
   */
  it('see the product name, price and thumbnail', () => {
    cy.wait('@getStorage')
    cy.fixture('storage.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        cy.findByText(item.name).should('be.visible')
        cy.findByTestId(`price-${item.name}`)
          .should('be.visible')
          .should('have.text', item.price.toFixed(2))
        cy.findByAltText(item.name).should('be.visible')
      })
    })
  })

  /**
   * I want to see a success page once I ordered
   */
  it('see the total price of all my selected products', () => {
    cy.wait('@getStorage')
    cy.fixture('storage.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        cy.findByTestId(`add-${item.name}`).click()
      })

      cy.findByTestId('total-due').should(
        'have.text',
        Cypress._.reduce(storage, (prev, curr) => prev + curr.price, 0).toFixed(
          2
        )
      )
    })
  })

  /**
   * I want to see a success page once I ordered
   * I want to see an error message if my order fails
   */
  it('see a success page once I ordered', () => {
    cy.wait('@getStorage')
    cy.fixture('storage.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        cy.findByTestId(`add-${item.name}`).click()
      })

      cy.findByTestId('total-due').should(
        'have.text',
        Cypress._.reduce(storage, (prev, curr) => prev + curr.price, 0).toFixed(
          2
        )
      )

      cy.findByText('Order', { selector: 'button' }).click()
      cy.findByText(/Thank you!/i).should('be.visible')
      cy.findByRole('img').should('be.visible')
    })
  })

  /**
   * I want to see an error message if my order fails
   */
  it('see an error message if my order fails', () => {
    cy.intercept('/api/order', { fixture: 'failure.json', statusCode: 400 })
    cy.wait('@getStorage')
    cy.fixture('storage.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        cy.findByTestId(`add-${item.name}`).click()
      })

      cy.findByTestId('total-due').should(
        'have.text',
        Cypress._.reduce(storage, (prev, curr) => prev + curr.price, 0).toFixed(
          2
        )
      )

      cy.findByText('Order', { selector: 'button' }).click()
      cy.findByText(/Your order did not go through! Please try again!/i)
        .should('be.visible')
        .should('have.class', 'text-red-600')
    })
  })

  /**
   * I want to see a "disabled" state if a product is out of stock.
   */
  it('see a "disabled" state if a product is out of stock', () => {
    cy.intercept('/api/storage', { fixture: 'storage-out-of-stock.json' })
    cy.fixture('storage-out-of-stock.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        if (item.stock === 0) {
          cy.findByTestId(`container-${item.name}`).should(
            'have.class',
            'opacity-50'
          )
        }
      })
    })
  })

  /**
   * For each product I want to be able:
   * to select the amount I want to order
   * to not select more items than are available
   */
  it.skip('add/remove items to the shopping cart', () => {
    cy.wait('@getStorage')
    cy.fixture('storage.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        cy.findByTestId(`remove-${item.name}`).should('be.disabled')
        cy.findByTestId(`add-${item.name}`).then(($btn) => {
          Cypress._.times(item.stock, () =>
            cy.wrap($btn).should('not.be.disabled').click()
          )
        })
        cy.findByTestId(`count-${item.name}`).should('have.text', item.stock)
        cy.findByTestId(`add-${item.name}`).should('be.disabled')
        cy.findByTestId(`remove-${item.name}`).click()
        cy.findByTestId(`count-${item.name}`).should(
          'have.text',
          item.stock - 1
        )
        cy.findByTestId(`add-${item.name}`).should('not.be.disabled')
      })
    })
  })

  /**
   * I want to be able to submit multiple orders
   */
  it('make multiple orders', () => {
    cy.wait('@getStorage')
    cy.fixture('storage.json').then(({ storage }) => {
      Cypress._.each(storage, (item) => {
        cy.findByTestId(`add-${item.name}`).click()
      })

      cy.findByTestId('total-due').should(
        'have.text',
        Cypress._.reduce(storage, (prev, curr) => prev + curr.price, 0).toFixed(
          2
        )
      )

      cy.findByText('Order', { selector: 'button' }).click()
      cy.findByText(/Thank you!/i).should('be.visible')
      cy.findByRole('img').should('be.visible')

      cy.findByText(/Submit another order/i).click()
      Cypress._.each(storage, (item) => {
        cy.findByTestId(`add-${item.name}`).click()
      })

      cy.findByTestId('total-due').should(
        'have.text',
        Cypress._.reduce(storage, (prev, curr) => prev + curr.price, 0).toFixed(
          2
        )
      )

      cy.findByText('Order', { selector: 'button' }).click()
      cy.findByText(/Thank you!/i).should('be.visible')
      cy.findByRole('img').should('be.visible')
    })
  })
})
