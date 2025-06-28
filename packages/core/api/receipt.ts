import type { Receipt } from '@pierre/core/models';
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@pierre/core/store";

export const fetchReceipt = createAsyncThunk<
  Receipt,
  string,
  { state: RootState }
>("fetchReceipt", async (orderId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Zocom": "um-B2mWxADrthdHqd22",
        },
      }
    );

    const data = await response.json();

    return data.receipt as Receipt;
  } catch (error) {
    return rejectWithValue(`Error: ${error}`);
  }
});