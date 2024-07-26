import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  auth: boolean;
}

const initialState: authState = {
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.auth = localStorage.getItem("auth") ? true : false;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkAuth, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
