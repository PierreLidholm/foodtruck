import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer";
import authorizationReducer from "../reducers/authorizationReducer";
import cartReducer from "../reducers/cartReducer";
import orderReducer from "../reducers/orderReducer";

export const store = configureStore({
  reducer: {
    product: productReducer,
    authorization: authorizationReducer,
    cart: cartReducer,
    order: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
