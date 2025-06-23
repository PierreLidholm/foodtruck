import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Receipt } from "../models/receipt";
import type { RootState } from "../store/store";
import type { InitialState } from "../models/initialState";

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

const initialState: InitialState<Receipt> = {
  data: {
    id: "",
    timestamp: "",
    orderValue: 0,
    items: [],
  },
  loading: false,
  error: false,
  status: "idle",
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReceipt.pending, (state) => {
      state.loading = true;

    });
    builder.addCase(fetchReceipt.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    });
    builder.addCase(fetchReceipt.rejected, (state) => {
      state.loading = false;
      state.status = "failed";
    });
  },
});

export default receiptSlice.reducer;
