describe('can add to cart, change quantity and remove from cart', () => {
  it('visits, gets and clicks', () => {
    // User visits products page
    cy.visit('http://localhost:3000/products');
    // User clicks on one product
    cy.get('[data-cy="single-product-link"]').first().click();
    // User adds product to cart
    cy.get('[data-cy="add-to-cart"]').click();
    // User increases quantity
    cy.get('[data-cy="increase-quantity-cart"]').click();
    // User decreases quantity
    cy.get('[data-cy="decrease-quantity-cart"]').click();
    // User removes item from cart
    cy.get('[data-cy="remove-from-cart"]').click();
  });
});
