import { createSlice } from "@reduxjs/toolkit";
import type { Receipt, InitialState } from "@pierre/core/models";
import { fetchReceipt } from "@pierre/core/api";

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
