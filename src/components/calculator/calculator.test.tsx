import React from 'react';
import {queryByTestId, render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Calculator from './calculator';

const mockStore = configureStore();
const store = {
  calculator: {
    cartValue: 0,
    distance: 0,
    amountOfItems: 0,
    time: '',
    deliveryFee: 10,
    isFeeCalculated: true,
  }
};

describe(`Calculator`, () => {
  it(`renders correctly`, () => {
    const deliveryFee = 10;

    render(
        <Provider store={mockStore(store)}>
          <Calculator />
        </Provider>
    );

    expect(screen.getByText(/Delivery Fee Calculator$/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivery price:/i)).toHaveTextContent(`${deliveryFee}`);
    expect(queryByTestId(document.documentElement, 'click-message')).not.toBeInTheDocument();
  });
});
