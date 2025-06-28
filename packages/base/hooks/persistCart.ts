import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@pierre/core/store";

export function PersistCart() {
  const cart = useSelector((state: RootState) => state.cart.data);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return null;
}