import calculatorReducer, {
  CalculatorState,
  setCartValue,
  setDistance,
  setAmount,
  setTime,
  setDeliveryFee,
  setIsFeeCalculatedStatus,
} from './calculatorSlice';

describe('calculator reducer', () => {
  const initialState: CalculatorState = {
    cartValue: 200,
    distance: 0,
    amountOfItems: 0,
    time: '',
    deliveryFee: 0,
    isFeeCalculated: false,
  };

  it('should handle initial state', () => {
    expect(calculatorReducer(undefined, { type: 'unknown' })).toEqual({
      cartValue: 0,
      distance: 0,
      amountOfItems: 0,
      time: '',
      deliveryFee: 0,
      isFeeCalculated: false,
    });
  });

  it('should handle setCartValue', () => {
    const actual = calculatorReducer(initialState, setCartValue(10));
    expect(actual.cartValue).toEqual(10);
  });

  it('should handle setDistance', () => {
    const actual = calculatorReducer(initialState, setDistance(1500));
    expect(actual.distance).toEqual(1500);
  });

  it('should handle setAmount', () => {
    const actual = calculatorReducer(initialState, setAmount(5));
    expect(actual.amountOfItems).toEqual(5);
  });

  it('should handle setTime', () => {
    const actual = calculatorReducer(initialState, setTime('Sun, 30 Jan 2022 10:00:00 GMT'));
    expect(actual.time).toEqual('Sun, 30 Jan 2022 10:00:00 GMT');
  });

  it('should handle setDeliveryFee', () => {
    const actual = calculatorReducer(initialState, setDeliveryFee(true));
    expect(actual.deliveryFee).toEqual(0);
    expect(actual.isFeeCalculated).toEqual(true);
  });

  it('should handle setIsFeeCalculatedStatus', () => {
    const actual = calculatorReducer(initialState, setIsFeeCalculatedStatus(true));
    expect(actual.isFeeCalculated).toEqual(true);
  });
});
