import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Order, PostOrder } from "@pierre/core/models";

export const postOrder = createAsyncThunk<Order, PostOrder>(
  "postOrder",
  async (order: PostOrder, thunkAPI) => {
    try {
      const response = await fetch(
        "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/pierre-lidholm/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Zocom": "um-B2mWxADrthdHqd22"
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        return thunkAPI.rejectWithValue(await response.json());
      }

      const data = await response.json();
      return data.order;
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
          },
        }
      );


      if (!response.ok) {
        return thunkAPI.rejectWithValue(await response.json());
      }

      const data = await response.json();

      return data.order as Order;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Error: ${error}`);
    }
  }
);