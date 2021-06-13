describe('can proceed through checkout flow to payment page and thank you page', () => {
  it('proceeds through checkout flow', () => {
    // User visits product page
    cy.visit('http://localhost:3000/products/6');
    // User clicks on Add to cart button to make sure there's an item in the cart
    cy.contains('Add to cart').click();
    // User clicks on shopping cart icon in header
    cy.get('[data-cy="cart-icon-in-header"]').click();
    // User clicks on Checkout button
    cy.get('[data-cy="checkout-button-on-shoppingcart-page"]').click();
    // User fills out the form on checkout page
    cy.get('[data-cy="first-name"]').type('Maria');
    cy.get('[data-cy="last-name"]').type('Musterfrau');
    cy.get('[data-cy="mail"]').type('maria.musterfrau@gmail.com');
    cy.get('[data-cy="phone-number"]').type('067684245874');
    cy.get('[data-cy="address"]').type('Katzenstraße 74/7');
    cy.get('[data-cy="zip-code"]').type('1100');
    cy.get('[data-cy="city"]').type('Vienna');
    cy.get('[data-cy="country"]').select('Austria');
    cy.get('[data-cy="credit-card-holder"]').type('Maria');
    cy.get('[data-cy="credit-card-number"]').type('1847379548086271');
    cy.get('[data-cy="credit-card-expiry-date"]').type('12/23');
    cy.get('[data-cy="credit-card-cvv"]').type('333');
    // User clicks on Submit Button
    cy.contains('Submit').click();
    // User can see Thank you page
    cy.contains('Thank you for your purchase');
  });
});
