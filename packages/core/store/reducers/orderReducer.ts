import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "../../models/initialState";
import type { Order } from "@pierre/core/models";
import { fetchOrder, postOrder } from "@pierre/core/api";

const initialState: InitialState<Order> = {
  error: false,
  loading: false,
  status: "idle",
  data: {
    id: null,
    items: [],
    timestamp: null,
    eta: null,
    orderValue: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(postOrder.rejected, (state) => {
      state.error = true;
      state.status = "failed";
      state.loading = false;
    });
    builder.addCase(fetchOrder.pending, (state) => {
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.status = "success";
      state.loading = false;
    });
    builder.addCase(fetchOrder.rejected, (state) => {
      state.error = true;
      state.status = "failed";
      state.loading = false;
    });
  },
});

export default orderSlice.reducer;
