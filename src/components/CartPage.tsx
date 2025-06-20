import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../models/product";
import type { AppDispatch, RootState } from "../store/store";
import CartList from "./cart/CartList";
import type { CartProduct } from "../models/cartProduct";
import { useMemo, useState } from "react";
import type { PostOrder } from "../models/postOrder";
import { postOrder } from "../reducers/orderReducer";
import { useNavigate } from "react-router-dom";
import type { Order } from "../models/order";

function CartPage() {
    const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState("");
  const productsInCart: Product[] = useSelector(
    (state: RootState) => state.cart.data.products
  );

  const submitOrder = () => {
    const itemIds: PostOrder = {
      items: productsInCart.map((p) => {
        return p.id;
      }),
    };

    dispatch(postOrder(itemIds))
    .unwrap()
    .then((response: Order) => {
        navigate(`order/${response.id}`)
    })
    .catch((error) => {
        setErrorMessage("Something went wrong!");
        console.log(`Error: ${error}`)
    });
  };

  const { cartProducts, totalPrice } = useMemo(() => {
    const map = new Map<number, CartProduct>();
    let total = 0;

    for (const product of productsInCart) {
      if (map.has(product.id)) {
        map.get(product.id)!.totalPrice += product.price;
        total += product.price;
      } else {
        map.set(product.id, { product, totalPrice: product.price });
        total += product.price;
      }
    }

    return {
      cartProducts: Array.from(map.values()),
      totalPrice: total,
    };
  }, [productsInCart]);

  return (
    <section className="d-flex flex-column h-100">
      <article className="text-start text-white rounded-1 p-3">
        <CartList cartProducts={cartProducts} />
      </article>

      <div className="mt-auto text-white">
        <div className="d-flex justify-content-between align-items-center bg-dark px-3 py-3 mb-2">
          <h2 className="fs-4 mb-0 fs-3">TOTALT</h2>
          <p className="fs-4 mb-0 fs-3">{totalPrice} SEK</p>
        </div>
        {errorMessage && <p className="text-warning">{errorMessage}</p>}
        <button
          type="submit"
          className="btn btn-primary w-100 py-3 fs-3 border"
          onClick={() => submitOrder()}
        >
          TAKE MY MONEY!
        </button>
      </div>
    </section>
  );
}

export default CartPage;
