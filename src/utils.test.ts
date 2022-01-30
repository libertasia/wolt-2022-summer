import { calculateDeliveryFee, roundToTwoDecimals } from './utils';

it(`Function roundToTwoDecimals works correctly`, () => {
  const expectedResult = 12.58;
  expect(roundToTwoDecimals(12.57867347825)).toEqual(expectedResult);
});

describe(`calculateDeliveryFee works correctly: `, () => {
  it(`The delivery is free (0€) when the cart value is equal or more than 100€.`, () => {
    const cartValue = 150;
    const distance = 1500;
    const amountOfItems = 5;
    const time = 	new Date('Sun, 30 Jan 2022 10:00:00 GMT');
    expect(calculateDeliveryFee(cartValue, distance, amountOfItems, time)).toEqual(0);
  });

  it(`If the cart value is less than 10€, a small order surcharge is added to the delivery price.
  The surcharge is the difference between the cart value and 10€. For example if the cart value is 8€, the surcharge will be 2€.`, () => {
    const cartValue = 8;
    const distance = 1000;
    const amountOfItems = 1;
    const time = new Date('Sun, 30 Jan 2022 10:00:00 GMT');
    //A delivery fee for the first 1000 meters (=1km) is 2€.
    const result = 4;
    expect(calculateDeliveryFee(cartValue, distance, amountOfItems, time)).toEqual(result);
  });

  it(`1€ is added for every additional 500 meters`, () => {
    const cartValue = 8;
    const distance = 1500;
    const amountOfItems = 1;
    const time = new Date('Sun, 30 Jan 2022 10:00:00 GMT');
    const result = 5;
    expect(calculateDeliveryFee(cartValue, distance, amountOfItems, time)).toEqual(result);
  });

  it(`If the number of items is five or more, an additional 50 cent surcharge is added for each item above four`, () => {
    const cartValue = 8;
    const distance = 1500;
    const amountOfItems = 6;
    const time = new Date('Sun, 30 Jan 2022 10:00:00 GMT');
    const result = 6;
    expect(calculateDeliveryFee(cartValue, distance, amountOfItems, time)).toEqual(result);
  });

  it(`During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.1x.`, () => {
    const cartValue = 8;
    const distance = 1500;
    const amountOfItems = 6;
    const time = new Date('Fri, 04 Feb 2022 16:00:00 GMT');
    const result = 6.6;
    expect(calculateDeliveryFee(cartValue, distance, amountOfItems, time)).toEqual(result);
  });

  it(`The delivery fee can never be more than 15€, including possible surcharges.`, () => {
    const cartValue = 8;
    const distance = 7000;
    const amountOfItems = 60;
    const time = new Date('Fri, 04 Feb 2022 16:00:00 GMT');
    const result = 15;
    expect(calculateDeliveryFee(cartValue, distance, amountOfItems, time)).toEqual(result);
  });
});
