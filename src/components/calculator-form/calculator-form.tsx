import React, { useState } from 'react';
import "flatpickr/dist/flatpickr.min.css";
import Flatpickr from 'react-flatpickr';
import { useAppDispatch } from '../../app/hooks';
import {
  setCartValue,
  setAmount,
  setDistance,
  setTime,
  setDeliveryFee,
  setIsFeeCalculatedStatus,
} from '../../app/calculatorSlice';
import { roundToTwoDecimals } from '../../utils';

const dateFormat: string = `d-m-Y H:i`;

const minDate: string = `today`;

const regexArray: Array<string> = ["e", "E", "+", "-"];

const CalculatorForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [cartAmount, setCartAmount] = useState<string>('0');
  const [distanceAmount, setDistanceAmount] = useState<string>('0');
  const [itemsAmount, setItemsAmount] = useState<string>('0');

  // rounding cartValue to 2 decimals
  const cartValue = roundToTwoDecimals(Number(cartAmount)) || 0;
  const distanceValue = Math.round(Number(distanceAmount)) || 0;
  const itemsValue = Math.round(Number(itemsAmount)) || 0;

  const keyDownHandler = (evt: React.KeyboardEvent) => {
    regexArray.includes(evt.key) && evt.preventDefault()
  }

  return (
    <form action="#" method="get">
      <div>
        <label htmlFor="cart-value">Cart value</label>
        <input
          id="cart-value" type="number" name="cart-value" step="any" min={0}
          value={cartAmount}
          onKeyDown={keyDownHandler}
          onChange={(e) => {
            dispatch(setIsFeeCalculatedStatus(false));
            setCartAmount(e.target.value);
          }}
          onBlur={() => {
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
          onKeyDown={keyDownHandler}
          onChange={(e) => {
            dispatch(setIsFeeCalculatedStatus(false));
            setDistanceAmount(e.target.value);
          }}
          onBlur={() => {
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
          onKeyDown={keyDownHandler}
          onChange={(e) => {
            dispatch(setIsFeeCalculatedStatus(false));
            setItemsAmount(e.target.value);
          }}
          onBlur={() => {
            dispatch(setAmount(itemsValue));
            setItemsAmount(itemsValue.toString());
          }}
        />
      </div>

      <div>
        <label htmlFor="time">Time</label>
        <Flatpickr
          // className="conversion-form__date"
          onChange={(selectedDates) => {
            dispatch(setIsFeeCalculatedStatus(false));
            dispatch(setTime(selectedDates[0]));
          }}
          name="time"
          placeholder="Select Date and Time.."
          options={{
            enableTime: true,
            dateFormat,
            minDate,
          }}/>
      </div>

      <button
        type="button"
        onClick={() => dispatch(setDeliveryFee(true))}
      >
        Calculate delivery price
      </button>
    </form>
  )
}

export default CalculatorForm;
