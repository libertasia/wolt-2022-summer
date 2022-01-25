import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState, AppThunk } from '../app/store';

export interface CalculatorState {
  cartValue: number;
  distance: number;
  amount: number;
  time: Date;
}

const initialState: CalculatorState = {
  cartValue: 0,
  distance: 0,
  amount: 0,
  time: new Date(),
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setCartValue: (state, action: PayloadAction<number>) => {
      state.cartValue = action.payload;
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setTime: (state, action: PayloadAction<Date>) => {
      state.time = action.payload;
    },
  },
});

export const { setCartValue, setDistance, setAmount, setTime } = calculatorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCount = (state: RootState) => state.counter.value;

export default calculatorSlice.reducer;
