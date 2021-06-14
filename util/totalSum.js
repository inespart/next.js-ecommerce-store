export function calculateTotalSum(productsArray) {
  return productsArray
    .reduce((acc, product) => {
      // need parseFloat to transform string into number
      return acc + parseFloat(product.price / 100) * product.quantity;
    }, 0)
    .toFixed(2);
  // console.log('finalShoppingCartArray', finalShoppingCartArray);
}
