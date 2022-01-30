import React from 'react';
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MainScreen from './main-screen';

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

describe(`MainScreen`, () => {
  it(`renders correctly`, () => {
     render(
        <Provider store={mockStore(store)}>
          <MainScreen />
        </Provider>
    );

    expect(screen.getByText(/Preliminary Assignment for Engineering Positions$/i)).toBeInTheDocument();
  });
});
