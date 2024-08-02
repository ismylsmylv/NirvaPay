import { db } from "@/lib/firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
      const existingCardBalance = existingData.card.balance || {};
      const existingTransactions = existingData.transactions || [];
      console.log(existingCardBalance + trData.newBalance);
      const updatedBalance = existingCardBalance + trData.newBalance || 0;
      const updatedTransactions =
        [...existingTransactions, trData.transactions] || [];
      console.log(updatedTransactions);
      // Update only the balance in the card
      await updateDoc(docRef, {
        "card.balance": updatedBalance,
        // Add transactions update if needed
        transactions: updatedTransactions,
      });

      console.log("Document successfully updated");
      return { trData };
    } catch (error) {
      console.error("Error updating document:", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const patchSender = createAsyncThunk(
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
      const existingCardBalance = existingData.card.balance || {};
      const existingTransactions = existingData.transactions || [];
      console.log(existingCardBalance + trData.newBalance);
      const updatedBalance = existingCardBalance - trData.newBalance || 0;
      const updatedTransactions =
        [...existingTransactions, trData.transactions] || [];
      console.log(updatedTransactions);
      // Update only the balance in the card
      await updateDoc(docRef, {
        "card.balance": updatedBalance,
        // Add transactions update if needed
        transactions: updatedTransactions,
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
