import React, { useState } from 'react';
import 'flatpickr/dist/flatpickr.min.css';
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
import ErrorMessage from '../error-message/error-message';
import { DATE_FORMAT, MIN_DATE, REGEX_ARRAY } from '../../const';

const CalculatorForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [cartAmount, setCartAmount] = useState<string>('');
  const [distanceAmount, setDistanceAmount] = useState<string>('');
  const [itemsAmount, setItemsAmount] = useState<string>('');
  const [timeAmount, setTimeAmount] = useState<string>('');
  const [isCartAmountError, setIsCartAmountError] = useState<boolean>(false);
  const [isDistanceError, setIsDistanceError] = useState<boolean>(false);
  const [isItemsAmountError, setIsItemsAmountError] = useState<boolean>(false);
  const [isTimeError, setIsTimeError] = useState<boolean>(false);

  // rounding cartValue to 2 decimals
  const cartValue = roundToTwoDecimals(Number(cartAmount)) || 0;
  const distanceValue = Math.round(Number(distanceAmount)) || 0;
  const itemsValue = Math.round(Number(itemsAmount)) || 0;

  const keyDownHandler = (evt: React.KeyboardEvent) => {
    REGEX_ARRAY.includes(evt.key) && evt.preventDefault();
  }

  const checkAmountError = (amount: string): boolean => {
    return !amount || !amount.trim() || parseInt(amount) === 0;
  }

  const checkTimeError = (time: string): boolean => {
    return !time || !time.trim();
  }

  const formSubmitHandler = (evt: React.FormEvent) => {
    evt.preventDefault();
    let hasError = false;
    const cartError = checkAmountError(cartAmount);
    const distanceError = checkAmountError(distanceAmount);
    const itemsError = checkAmountError(itemsAmount);
    const timeError = checkTimeError(timeAmount);
    setIsCartAmountError(cartError);
    setIsDistanceError(distanceError);
    setIsItemsAmountError(itemsError);
    setIsTimeError(timeError);
    hasError = cartError || distanceError || itemsError || timeError;
    if (hasError) {
      return;
    }

    dispatch(setDeliveryFee(true));
  }

  return (
    <form className='calculator__form calculator-form' action='#' method='get' onSubmit={formSubmitHandler}>
      <div className='calculator-form__field-wrapper'>
        <label className='calculator-form__label' htmlFor='cart-value'>Cart value, <span>&euro;</span></label>
        <div className='calculator-form__input-wrapper'>
          <input
            className={`calculator-form__input ${isCartAmountError ? 'calculator-form__input-error' : ''}`}
            id='cart-value' type='number' name='cart-value' step='any' min={0}
            placeholder='20'
            value={cartAmount}
            onKeyDown={keyDownHandler}
            onChange={(e) => {
              dispatch(setIsFeeCalculatedStatus(false));
              setCartAmount(e.target.value);
              setIsCartAmountError(checkAmountError(e.target.value));
            }}
            onBlur={() => {
              dispatch(setCartValue(cartValue));
              setCartAmount(cartValue.toString());
            }}
          />
          {isCartAmountError &&
            <ErrorMessage />
          }
        </div>
      </div>

      <div className='calculator-form__field-wrapper'>
        <label className='calculator-form__label' htmlFor='distance'>Delivery distance, <span>m</span></label>
        <div className='calculator-form__input-wrapper'>
          <input
            className={`calculator-form__input ${isDistanceError ? 'calculator-form__input-error' : ''}`}
            id='distance' type='number' name='distance' min={0}
            placeholder='1500'
            value={distanceAmount}
            onKeyDown={keyDownHandler}
            onChange={(e) => {
              dispatch(setIsFeeCalculatedStatus(false));
              setDistanceAmount(e.target.value);
              setIsDistanceError(checkAmountError(e.target.value));
            }}
            onBlur={() => {
              dispatch(setDistance(distanceValue));
              setDistanceAmount(distanceValue.toString());
            }}
          />
          {isDistanceError &&
            <ErrorMessage />
          }
        </div>
      </div>

      <div className='calculator-form__field-wrapper'>
        <label className='calculator-form__label' htmlFor='amount'>Amount of items</label>
        <div className='calculator-form__input-wrapper'>
          <input
            className={`calculator-form__input ${isItemsAmountError ? 'calculator-form__input-error' : ''}`}
            id='amount' type='number' name='amount' min={0}
            placeholder='5'
            value={itemsAmount}
            onKeyDown={keyDownHandler}
            onChange={(e) => {
              dispatch(setIsFeeCalculatedStatus(false));
              setItemsAmount(e.target.value);
              setIsItemsAmountError(checkAmountError(e.target.value));
            }}
            onBlur={() => {
              dispatch(setAmount(itemsValue));
              setItemsAmount(itemsValue.toString());
            }}
          />
          {isItemsAmountError &&
            <ErrorMessage />
          }
        </div>
      </div>

      <div className='calculator-form__field-wrapper'>
        <label className='calculator-form__label' htmlFor='time'>Time</label>
        <div className='calculator-form__input-wrapper'>
          <Flatpickr
            className={`calculator-form__input calculator-form__input--calendar ${isTimeError ? 'calculator-form__input-error' : ''}`}
            onChange={(selectedDates) => {
              if (selectedDates.length > 0) {
                setTimeAmount(selectedDates[0].toString())
                setIsTimeError(checkTimeError(selectedDates[0].toString()))
                dispatch(setIsFeeCalculatedStatus(false));
                dispatch(setTime(selectedDates[0].toUTCString()));
              }
              else {
                setTimeAmount('');
                setIsTimeError(true);
              }
            }}
            name='time'
            placeholder='Select Date and Time..'
            options={{
              enableTime: true,
              dateFormat: DATE_FORMAT,
              minDate: MIN_DATE,
            }}/>
          {isTimeError &&
            <ErrorMessage />
          }
        </div>
      </div>

      <button className='calculator-form__button' type='submit'>Calculate delivery price</button>
    </form>
  )
}

export default CalculatorForm;
