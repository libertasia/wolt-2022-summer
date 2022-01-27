import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateDeliveryFee } from "../utils";
import { RootState } from "./store";

export interface CalculatorState {
  cartValue: number;
  distance: number;
  amountOfItems: number;
  time: Date;
  deliveryFee: number;
  isFeeCalculated: boolean;
}

const initialState: CalculatorState = {
  cartValue: 0,
  distance: 0,
  amountOfItems: 0,
  time: new Date(),
  deliveryFee: 0,
  isFeeCalculated: false,
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
      state.amountOfItems = action.payload;
    },
    setTime: (state, action: PayloadAction<Date>) => {
      state.time = action.payload;
    },
    setDeliveryFee: (state, action: PayloadAction<boolean>) => {
      state.deliveryFee = calculateDeliveryFee(state.cartValue, state.distance, state.amountOfItems, state.time);
      state.isFeeCalculated = action.payload;
    },
    setIsFeeCalculatedStatus: (state, action: PayloadAction<boolean>) => {
      state.isFeeCalculated = action.payload;
    },
  },
});

export const { setCartValue, setDistance, setAmount, setTime, setDeliveryFee, setIsFeeCalculatedStatus } = calculatorSlice.actions;

export const selectDeliveryFee = (state: RootState) => state.calculator.deliveryFee;

export const selectIsFeeCalculatedStatus = (state: RootState) => state.calculator.isFeeCalculated;

export default calculatorSlice.reducer;
