import {
  BIG_CART_VALUE,
  FREE_DELIVERY_FEE,
  SMALL_CART_VALUE,
  BASE_DELIVERY_FEE,
  BASE_DISTANCE,
  DELIVERY_DISTANCE_STEP,
  SURCHARGE_PER_DISTANCE_STEP,
  ITEMS_AMOUNT_WITHOUT_SURCHARGE,
  SURCHARGE_PER_ITEM,
  FRIDAY_RUSH_DAY,
  FRIDAY_RUSH_HOUR_END,
  FRIDAY_RUSH_HOUR_START,
  FRIDAY_RUSH_MULTIPLIER,
  MAX_DELIVERY_FEE
} from './const';

export type ReturnDeliveryFee = (
  cartValue: number,
  distance: number,
  amountOfItems: number,
  time: Date,
) => number;

export const calculateDeliveryFee: ReturnDeliveryFee = (cartValue, distance, amountOfItems, time) => {
  let deliveryFee = 0;

  // The delivery is free (0€) when the cart value is equal or more than 100€.
  if (cartValue >= BIG_CART_VALUE) {
    return FREE_DELIVERY_FEE;
  }

  // If the cart value is less than 10€, a small order surcharge is added to the delivery price.
  // The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
  if (cartValue < SMALL_CART_VALUE) {
    deliveryFee += SMALL_CART_VALUE - cartValue;
  }

  // A delivery fee for the first 1000 meters (=1km) is 2€.
  deliveryFee += BASE_DELIVERY_FEE;

  if (distance > BASE_DISTANCE) {
    // 1€ is added for every additional 500 meters
    const extraDistance = distance - BASE_DISTANCE;
    let distanceSteps = Math.floor(extraDistance / DELIVERY_DISTANCE_STEP)
    if (extraDistance % DELIVERY_DISTANCE_STEP > 0) {
      distanceSteps += 1;
    }
    deliveryFee += distanceSteps * SURCHARGE_PER_DISTANCE_STEP;
  }

  if (amountOfItems > ITEMS_AMOUNT_WITHOUT_SURCHARGE) {
    const extraItemsAmount = amountOfItems - ITEMS_AMOUNT_WITHOUT_SURCHARGE;
    deliveryFee += extraItemsAmount * SURCHARGE_PER_ITEM;
  }

  let isFridayRush = time.getUTCDay() === FRIDAY_RUSH_DAY && (time.getUTCHours() >= FRIDAY_RUSH_HOUR_START || time.getUTCHours() <= FRIDAY_RUSH_HOUR_END)
  if (isFridayRush) {
    deliveryFee = deliveryFee * FRIDAY_RUSH_MULTIPLIER;
  }

  // The delivery fee can never be more than 15€, including possible surcharges.
  return deliveryFee < MAX_DELIVERY_FEE ? roundToTwoDecimals(deliveryFee) : MAX_DELIVERY_FEE;
}

export const roundToTwoDecimals = (num: number): number => {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100
}
