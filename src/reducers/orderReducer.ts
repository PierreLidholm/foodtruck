import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "../models/initialState";
import type { PostOrder } from "../models/postOrder";
import type { Order } from "../models/order";

export const postOrder = createAsyncThunk<Order, PostOrder>(
  "postOrder",
  async (order: PostOrder, thunkAPI) => {
    console.log(order);
    try {
      const response = await fetch(
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/pierre-lidholm/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-zocom": "um-B2mWxADrthdHqd22",
            tentant: "pierre-lidholm",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        return thunkAPI.rejectWithValue(await response.json());
      }

      const data: Order = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Error ${error}`);
    }
  }
);

export const fetchOrder = createAsyncThunk<Order, string>(
  "fetchOrder",
  async (orderId, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/pierre-lidholm/orders/${orderId}`,
        {
          headers: {
            "x-zocom": "um-B2mWxADrthdHqd22",
            "tentant": "pierre-lidholm",
            "id": orderId,
          },
        }
      );

      if (!response.ok) {
        return thunkAPI.rejectWithValue(await response.json());
      }

      const data: Order = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Error: ${error}`);
    }
  }
);

const initialState: InitialState<Order> = {
  error: false,
  loading: false,
  status: "idle",
  data: {
    id: null,
    items: [],
    timestamp: null,
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
        state.status = "success";
        state.data = action.payload;
    });
     builder.addCase(fetchOrder.rejected, (state) => {
        state.error = false;
        state.status = "failed";
    })
  },
});

export default orderSlice.reducer;
