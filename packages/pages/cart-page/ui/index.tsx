import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingBanner, ErrorBanner } from "@pierre/base/ui";
import { setCartToEmpty, type AppDispatch, type RootState } from "@pierre/core/store";
import { useSliceStatus } from "@pierre/base/hooks";
import type { CartProduct, Order, PostOrder, Product } from "@pierre/core/models";
import { postOrder } from "packages/core/api/order";
import CartList from "../components/CartList";

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState("");

  const { loading, error, status } = useSliceStatus("product");
  const productsInCart: Product[] = useSelector(
    (state: RootState) => state.cart.data.products
  );

  const submitOrder = () => {
    const itemIds: PostOrder = {
      items: productsInCart.map((p) => p.id),
    };

    dispatch(postOrder(itemIds))
      .unwrap()
      .then((response: Order) => {
        navigate(`/order/${response.id}`);

        dispatch(setCartToEmpty());
      })
      .catch((error) => {
        setErrorMessage(`${error.message} `);
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

  if (loading) return <LoadingBanner />;

  if (error || status == "failed")
    return <ErrorBanner text={"Något gick fel. Försök igen."} />;

  return (
    <section
      className="d-flex flex-column header-footer-bg "
      style={{ height: "100vh" }}
    >
      <div className="container">
        <h2>Kundvagn</h2>
        <article className="text-start text-white rounded-1 py-3 overflow-auto">
          <CartList cartProducts={cartProducts} />
        </article>

        <div className="mt-auto text-white ">
          <div className="d-flex justify-content-between align-items-center bg-dark px-3 py-3 mb-2">
            <h2 className="fs-4 mb-0 fs-3">TOTALT</h2>
            <p className="fs-4 mb-0 fs-3">{totalPrice} SEK</p>
          </div>
          {errorMessage && <p className="text-danger fs-3">{errorMessage}</p>}
          <button
            type="submit"
            className="btn btn-primary w-100 py-3 fs-3 border"
            onClick={() => submitOrder()}
          >
            TAKE MY MONEY!
          </button>
        </div>
      </div>
    </section>
  );
}

export { CartPage };
