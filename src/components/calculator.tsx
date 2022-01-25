import React, { useState } from 'react';
import "flatpickr/dist/flatpickr.min.css";
import Flatpickr from 'react-flatpickr';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setCartValue,
  setAmount,
  setDistance,
  setTime
} from '../app/calculatorSlice';

const dateFormat: string = `d-m-Y H:i`;

const minDate: string = `today`;

const Calculator: React.FC = () => {
  const dispatch = useAppDispatch();

  const [cartAmount, setCartAmount] = useState('0');
  const [distanceAmount, setDistanceAmount] = useState('0');
  const [itemsAmount, setItemsAmount] = useState('0');

  // rounding cartValue to 2 decimals
  const cartValue = Math.round((Number(cartAmount) + Number.EPSILON) * 100) / 100 || 0;
  const distanceValue = Math.round(Number(distanceAmount)) || 0;
  const itemsValue = Math.round(Number(itemsAmount)) || 0;

  return (
    <section>
      <h2>Delivery Fee Calculator</h2>

      <form action="#" method="get">
        <div>
          <label htmlFor="cart-value">Cart value</label>
          <input
            id="cart-value" type="number" name="cart-value" step="any" min={0}
            value={cartAmount}
            onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
            onChange={(e) => setCartAmount(e.target.value)}
            onBlur={(e) => {
              dispatch(setCartValue(cartValue));
              setCartAmount(cartValue.toString());
            }}
          />
          <span>&euro;</span>
        </div>

        <div>
          <label htmlFor="distance">Delivery distance</label>
          <input
            id="distance" type="number" name="distance" min={0}
            value={distanceAmount}
            onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
            onChange={(e) => setDistanceAmount(e.target.value)}
            onBlur={(e) => {
              dispatch(setDistance(distanceValue));
              setDistanceAmount(distanceValue.toString());
            }}
          />
          <span>m</span>
        </div>

        <div>
          <label htmlFor="amount">Amount of items</label>
          <input
            id="amount" type="number" name="amount" min={0}
            value={itemsAmount}
            onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
            onChange={(e) => setItemsAmount(e.target.value)}
            onBlur={(e) => {
              dispatch(setAmount(itemsValue));
              setItemsAmount(itemsValue.toString());
            }}
          />
        </div>

        <div>
          <label htmlFor="time">Time</label>
          <Flatpickr
            // className="conversion-form__date"
            // defaultValue={conversionDate.toLocaleDateString()}
            onChange={(selectedDates) => dispatch(setTime(selectedDates[0]))}
            name="time"
            placeholder="Select Date and Time.."
            options={{
              enableTime: true,
              dateFormat,
              minDate,
            }}/>
        </div>

        <button type="button">Calculate delivery price</button>
      </form>

      <p>Delivery price: <span></span> <span>&euro;</span></p>
    </section>
  )
}

export default Calculator;
