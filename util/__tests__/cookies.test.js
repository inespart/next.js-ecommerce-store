/**
 * @jest-environment jsdom
 */

import { addItemByProductId, subtractItemByProductId } from '../cookies';

// #1 Unit test: Test functions for adding and removing info from cookie
// #1.1 Add info to cookie
test('add info to cookie', () => {
  const testId = 3;
  const expectedResult = [{ id: 3, quantity: 1 }];

  const result = addItemByProductId(testId);
  expect(result).toEqual(expectedResult);
});

// #1.2 Remove info from cookie
test('remove info to cookie', () => {
  const testId = 3;
  const expectedResult = [];

  const result = subtractItemByProductId(testId);
  expect(result).toEqual(expectedResult);
});

// #2 Unit test: Test function for updating amount in item of cookie (eg. adding an item to the cart that already exists)
// #2.1 Increase amount of item in cart that already exists
test('increase amount', () => {
  const testId = 3;
  const expectedResult = [{ id: 3, quantity: 4 }];

  addItemByProductId(testId);
  addItemByProductId(testId);
  addItemByProductId(testId);
  const result = addItemByProductId(testId);
  expect(result).toEqual(expectedResult);

  // set array to []
  subtractItemByProductId(testId);
  subtractItemByProductId(testId);
  subtractItemByProductId(testId);
  subtractItemByProductId(testId);
});

// #2.2 Reduce amount of item in cart that already exists
test('decrease amount', () => {
  const testId = 3;
  const expectedResult = [{ id: 3, quantity: 1 }];

  addItemByProductId(testId);
  addItemByProductId(testId);
  addItemByProductId(testId);
  addItemByProductId(testId);
  subtractItemByProductId(testId);
  subtractItemByProductId(testId);
  const result = subtractItemByProductId(testId);
  expect(result).toEqual(expectedResult);
});
