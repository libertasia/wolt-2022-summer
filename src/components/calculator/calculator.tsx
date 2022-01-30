import React from 'react';
import { selectDeliveryFee, selectIsFeeCalculatedStatus } from '../../app/calculatorSlice';
import { useAppSelector } from '../../app/hooks';
import CalculatorForm from '../calculator-form/calculator-form';


const Calculator: React.FC = () => {
  const deliveryFee: number = useAppSelector(selectDeliveryFee);
  const isFeeCalculated: boolean = useAppSelector(selectIsFeeCalculatedStatus);

  return (
    <section className='calculator'>
      <h2 className='calculator__title'>Delivery Fee Calculator</h2>

      <CalculatorForm />

      <div className='calculator__message-wrapper'>
        {isFeeCalculated
          ? <p className='calculator__message-price'>Delivery price: <span>{deliveryFee}</span> <span>&euro;</span></p>
          : <p className='calculator__message-click'>Click button to calculate Delivery price</p>
        }
      </div>
    </section>
  )
}

export default Calculator;
