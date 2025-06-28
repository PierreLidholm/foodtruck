import { createSlice } from "@reduxjs/toolkit";
import type { Product, InitialState } from "@pierre/core/models";
import { fetchProducts } from "@pierre/core/api";


const initialState: InitialState<Product[]> = {
  data: [],
  loading: false,
  error: false,
  status: "idle",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      console.log("fetchProducts.pending fired");
      state.loading = true;
      state.status = "pending";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.error = true;
      state.status = "failed";
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
