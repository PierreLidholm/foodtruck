import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@pierre/core/store";
import { rehydrateCart } from "@pierre/core/store";
import { PersistCart } from "packages/base/hooks/persistCart";

const cartData = localStorage.getItem("cart");
if (cartData) {
  store.dispatch(rehydrateCart(JSON.parse(cartData)));
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistCart />
      <App />
    </Provider>
  </StrictMode>,
);
