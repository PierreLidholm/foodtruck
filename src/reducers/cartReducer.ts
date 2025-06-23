import { createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../models/cart";
import type { InitialState } from "../models/initialState";

const initialState: InitialState<Cart> = {
  loading: false,
  error: false,
  data: {
    id: null,
    products: [],
  },
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.data.products.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.data.products = state.data.products.filter(
        (x) => x.id !== action.payload
      );
    },
    setCartToEmpty: (state) => {
      state.data.products = [];
    }
  },
});

export const { addToCart, removeFromCart, setCartToEmpty } = cartSlice.actions;

export default cartSlice.reducer;
