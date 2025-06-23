import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type RootState } from "../store/store";
import type { Product } from "../models/product";
import type { InitialState } from "../models/initialState";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("fetchProducts", async (_, { rejectWithValue }) => {

  try {
    const response = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu",
      {
        headers: {
          "x-zocom": "um-B2mWxADrthdHqd22",
        },
      },
    );
    const data = await response.json();

    return data.items as Product[];
  } catch (error) {
    return rejectWithValue(`Error ${error}`);
  }
});

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
