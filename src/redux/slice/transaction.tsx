import { db } from "@/lib/firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export interface transactionState {
  transaction: {};
  completedTransaction: {};
}

const initialState: transactionState = {
  transaction: {},
  completedTransaction: {},
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
      const existingNotifications = existingData.notifications || [];
      console.log(existingCardBalance + trData.newBalance);
      const updatedBalance = existingCardBalance + trData.newBalance || 0;
      const updatedTransactions =
        [...existingTransactions, trData.transactions] || [];
      const notification = {
        title: "Transaction successful",
        content: trData.transactions,
        unread: true,
      };
      const updatedNotifications =
        [...existingNotifications, notification] || [];
      console.log(updatedTransactions);
      // Update only the balance in the card
      await updateDoc(docRef, {
        "card.balance": updatedBalance,
        // Add transactions update if needed
        transactions: updatedTransactions,
        notifications: updatedNotifications,
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
      const existingNotifications = existingData.notifications || [];
      console.log(existingCardBalance + trData.newBalance);
      const updatedBalance = existingCardBalance - trData.newBalance || 0;
      const updatedTransactions =
        [...existingTransactions, trData.transactions] || [];
      const notification = {
        title: "Transaction successful",
        content: trData.transactions,
        unread: true,
      };
      const updatedNotifications =
        [...existingNotifications, notification] || [];
      console.log(updatedTransactions);
      // Update only the balance in the card
      await updateDoc(docRef, {
        "card.balance": updatedBalance,
        // Add transactions update if needed
        transactions: updatedTransactions,
        notifications: updatedNotifications,
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
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(patchReciever.fulfilled, (state, action) => {
      console.log("patchReciever fulfilled:", action.payload);
      state.completedTransaction = state.transaction;
    });
    builder.addCase(patchReciever.rejected, (state, action) => {
      console.error("patchReciever rejected:", action.payload);
    });
  },
});

export const { checktransaction, setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
