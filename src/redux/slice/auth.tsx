import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
export interface authState {
  auth: boolean;
  userdatas: [];
  uid: string;
}

const initialState: authState = {
  auth: false,
  userdatas: [],
  uid: "",
};
export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const docRef = doc(
      db,
      "users",
      JSON.parse(localStorage.getItem("auth")).uid
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
);
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
      state.uid = state.auth
        ? JSON.parse(localStorage.getItem("auth")).uid
        : "";
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.userdatas = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { checkAuth, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
