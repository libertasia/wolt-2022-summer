import React from 'react';
import { selectDeliveryFee, selectIsFeeCalculatedStatus } from '../../app/calculatorSlice';
import { useAppSelector } from '../../app/hooks';
import CalculatorForm from '../calculator-form/calculator-form';


const Calculator: React.FC = () => {
  const deliveryFee = useAppSelector(selectDeliveryFee);
  const isFeeCalculated = useAppSelector(selectIsFeeCalculatedStatus);

  return (
    <section>
      <h2>Delivery Fee Calculator</h2>

      <CalculatorForm />

      {isFeeCalculated
        ? <p>Delivery price: <span>{deliveryFee}</span> <span>&euro;</span></p>
        : <p>Click button to calculate Delivery price</p>
      }

    </section>
  )
}

export default Calculator;
