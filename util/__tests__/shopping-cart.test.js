/**
 * @jest-environment jsdom
 */

import { calculateTotalQuantity } from '../totalQuantity';
import { calculateTotalSum } from '../totalSum';

// Unit test: Test total sum function inside cart
test('test total sum function', () => {
  const testArray = [
    { id: 6, price: '590', quantity: 2 },
    { id: 1, price: '390', quantity: 3 },
  ];

  const result = calculateTotalSum(testArray);
  expect(result).toBe('23.50');
});

// Unit test: Test total amount of items inside cart
test('test total amount of items inside cart', () => {
  const testArray = [
    { id: 6, quantity: 2 },
    { id: 1, quantity: 3 },
  ];

  const result = calculateTotalQuantity(testArray);
  expect(result).toBe(5);
});
