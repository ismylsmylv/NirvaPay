import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
export interface authState {
  auth: boolean;
  userdatas: [];
  uid: string;
  reciever: string;
  cardholder: string;
}

const initialState: authState = {
  auth: false,
  userdatas: [],
  uid: "",
  reciever: "",
  cardholder: "",
};
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async () => {
    const docRef = doc(
      db,
      "users",
      JSON.parse(localStorage.getItem("auth") as string).uid
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
);
export const fetchUserByCardNumber = createAsyncThunk(
  "users/fetchUserByCardNumber",
  async (cardNumber) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("card.number", "==", cardNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming you only expect one user per card number
        const userDoc = querySnapshot.docs[0];
        console.log(userDoc.data());

        return userDoc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user by card number:", error);
      throw error;
    }
  }
);
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      // if (!id) {
      //   throw new Error("Invalid ID");
      // }

      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return rejectWithValue("No such document!");
      }
    } catch (error: any) {
      console.error("Error fetching document:", error);
      return rejectWithValue(error.message);
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
        ? JSON.parse(localStorage.getItem("auth") as string).uid
        : "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.userdatas = action.payload as any;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.reciever = action.payload as any;
    });

    builder.addCase(fetchUserByCardNumber.fulfilled, (state, action) => {
      // Add user to the state array
      state.cardholder = action?.payload?.card?.cardholder || "none";
      // console.log(JSON.stringify(state.cardholder));
    });
  },
});

// Action creators are generated for each case reducer function
export const { checkAuth } = authSlice.actions;

export default authSlice.reducer;
