export function calculateTotalQuantity(productsArray) {
  return productsArray
    .map((p) => p.quantity)
    .reduce((total, currentValue) => total + currentValue, 0);
  // console.log('quantity', quantity);
}
