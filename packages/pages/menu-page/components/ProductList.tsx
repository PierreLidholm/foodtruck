import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@pierre/core/store";
import { FoodCard } from "./FoodCard";
import { useEffect, useMemo } from "react";
import { fetchProducts } from "@pierre/core/api";
import type { Product } from "@pierre/core/models";
import SideItemsCard from "./SideItemCard";
import { addToCart } from "@pierre/core/store";
import { useSliceStatus } from "@pierre/base/hooks";
import { LoadingBanner, ErrorBanner } from "@pierre/base/ui";
import "./ProductList.css";

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const products: Product[] = useSelector(
    (state: RootState) => state.product.data
  );

  const { loading, error, status } = useSliceStatus("product");

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const meals: Product[] = useMemo(() => {
    return products.filter((product) => product.type === "wonton");
  }, [products]);

  const dips = useMemo(() => {
    return products.filter((product) => product.type === "dip");
  }, [products]);

  const drinks = useMemo(() => {
    return products.filter((product) => product.type === "drink");
  }, [products]);

  if (loading) return <LoadingBanner />;

  if (error || status == "failed")
    return <ErrorBanner text={"Något gick fel. Försök igen."} />;

  return (
    <ul className="list-unstyled">
      {meals.map((meal) => (
        <li
          className="item"
          key={meal.id}
          onClick={() => handleAddToCart(meal)}
        >
          <FoodCard product={meal} />
        </li>
      ))}
      <li>
        <SideItemsCard products={dips} type="dip" addToCart={handleAddToCart} />
      </li>
      <li>
        <SideItemsCard
          products={drinks}
          type="drink"
          addToCart={handleAddToCart}
        />
      </li>
    </ul>
  );
}

export { ProductList };
