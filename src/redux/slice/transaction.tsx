import { app } from "@/lib/firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export interface transactionState {
  transaction: boolean;
  userdatas: [];
  uid: string;
}

const initialState: transactionState = {
  transaction: false,
  userdatas: [],
  uid: "",
};

export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const transactionData = localStorage.getItem("transaction");
    if (!transactionData) {
      console.error("No transaction data in localStorage");
      return;
    }

    const { uid } = JSON.parse(transactionData);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No such document!");
    }
  }
);
export const patchReciever = createAsyncThunk(
  "apps/patchReciever",
  async (
    trData: { docId: string; newBalance: number; transactions: [] },
    thunkAPI
  ) => {
    const docRef = doc(db, "users", trData.docId);

    try {
      console.log("Updating document:", trData.docId);
      console.log("New Balance:", trData.newBalance);

      // Fetch the existing document
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        throw new Error("Document does not exist");
      }

      // Get the existing card data
      const existingData = docSnapshot.data();
      const existingCard = existingData.card || {};

      // Update only the balance in the card
      await updateDoc(docRef, {
        "card.balance": trData.newBalance,
        // Add transactions update if needed
        // transactions: trData.transactions,
      });

      console.log("Document successfully updated");
      return { trData };
    } catch (error) {
      console.error("Error updating document:", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    checktransaction: (state) => {
      console.log("first");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.userdatas = action.payload as any;
    });
    builder.addCase(patchReciever.fulfilled, (state, action) => {
      console.log("patchReciever fulfilled:", action.payload);
    });
    builder.addCase(patchReciever.rejected, (state, action) => {
      console.error("patchReciever rejected:", action.payload);
    });
  },
});

export const { checktransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
