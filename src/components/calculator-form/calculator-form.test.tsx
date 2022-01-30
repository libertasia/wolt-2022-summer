import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import CalculatorForm from './calculator-form';

const mockStore = configureStore();
const store = {
  calculator: {
    cartValue: 0,
    distance: 0,
    amountOfItems: 0,
    time: '',
    deliveryFee: 0,
    isFeeCalculated: false,
  }
};

describe(`Calculator Form`, () => {
  it(`renders correctly`, () => {
    render(
        <Provider store={mockStore(store)}>
          <CalculatorForm/>
        </Provider>
    );

    expect(screen.getByText(/Cart value,$/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivery distance,$/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount of items$/i)).toBeInTheDocument();
    expect(screen.getByText(/Time$/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('cart-value-input')).toBeInTheDocument();
    expect(screen.getByTestId('distance-input')).toBeInTheDocument();
    expect(screen.getByTestId('amount-input')).toBeInTheDocument();
    expect(screen.getByTestId('time-input')).toBeInTheDocument();
  });
});
