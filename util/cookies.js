import cookies from 'js-cookie';

export function getQuantityCookieValue() {
  const cookieValue = cookies.getJSON('quantity');
  // Test if cookie value is an array
  return Array.isArray(cookieValue)
    ? // if it is, return the array value
      cookieValue
    : // if it's not, return an empty array
      [];
}

export function addItemByProductId(id) {
  // newCookieValue is the decoded version of whatever is inside the cookie; currently an array
  const newCookieValue = [...getQuantityCookieValue()];

  const quantityItemInCookie = newCookieValue.find(
    (qantityItem) => qantityItem.id === id,
  );

  if (quantityItemInCookie) {
    quantityItemInCookie.quantity = quantityItemInCookie.quantity + 1;
  } else {
    newCookieValue.push({
      id: id,
      quantity: 1,
    });
  }

  cookies.set('quantity', newCookieValue);
}

export function parseCookieValue(value) {
  try {
    return JSON.parse(value);
  } catch (err) {
    return undefined;
  }
}
