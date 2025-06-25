import type { Product } from "@pierre/core/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@pierre/core/store";

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
      }
    );
    const data = await response.json();

    return data.items as Product[];
  } catch (error) {
    return rejectWithValue(`Error ${error}`);
  }
});