import cookies from 'js-cookie';

export function getShoppingCartCookieValue() {
  const cookieValue = cookies.getJSON('shoppingCart');
  // Test if cookie value is an array
  return Array.isArray(cookieValue)
    ? // if it is, return the array value
      cookieValue
    : // if it's not, return an empty array
      [];
}

export function addItemByProductId(id) {
  // newCookieValue is the decoded version of whatever is inside the cookie; currently an array
  const newCookieValue = [...getShoppingCartCookieValue()];

  // id that we're passing and the id of the product
  const productIdInCookie = newCookieValue.find((p) => p.id === id);
  // console.log('productIdInCookie', productIdInCookie);

  if (productIdInCookie) {
    productIdInCookie.quantity = productIdInCookie.quantity + 1;
  } else {
    newCookieValue.push({
      id: id,
      quantity: 1,
    });
  }

  // this function creates the cookie
  cookies.set('shoppingCart', newCookieValue);

  return newCookieValue;
}

export function subtractItemByProductId(id) {
  // newCookieValue is the decoded version of whatever is inside the cookie; currently an array
  const newCookieValue = [...getShoppingCartCookieValue()];

  // id that we're passing and the id of the product
  const productIdInCookie = newCookieValue.find((p) => p.id === id);

  if (productIdInCookie.quantity > 1) {
    productIdInCookie.quantity = productIdInCookie.quantity - 1;
  } else {
    // get index of product with the id that's passed as a parameter
    const removeIndex = newCookieValue
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);

    // remove object
    newCookieValue.splice(removeIndex, 1);

    // if (productIdInCookie) {
    //   productIdInCookie.quantity = 0;
    // } else {
    //   alert('xxx');
    // }
  }

  // this function creates the cookie
  cookies.set('shoppingCart', newCookieValue);

  return newCookieValue;
}

export function removeItemByProductId(id) {
  // newCookieValue is the decoded version of whatever is inside the cookie; currently an array
  const newCookieValue = [...getShoppingCartCookieValue()];

  // // id that we're passing and the id of the product
  const productIdInCookie = newCookieValue.find((p) => p.id === id);
  console.log('--productIdInCookie--', productIdInCookie);

  // get index of product with the id that's passed as a parameter
  const removeIndex = newCookieValue
    .map(function (item) {
      return item.id;
    })
    .indexOf(id);

  // remove object
  newCookieValue.splice(removeIndex, 1);

  if (productIdInCookie) {
    productIdInCookie.quantity = 0;
  } else {
    alert('xxx');
  }

  // this function creates the cookie
  cookies.set('shoppingCart', newCookieValue);

  return newCookieValue;
}

export function parseCookieValue(value) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
}
