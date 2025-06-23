import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import ProductCard from "./FoodCard";
import { useEffect, useMemo } from "react";
import { fetchProducts } from "../../reducers/productReducer";
import type { Product } from "../../models/product";
import SideItemsCard from "./SideItemsCard";
import { addToCart } from "../../reducers/cartReducer";
import { useSliceStatus } from "../../helpers/useSliceHelper";
import LoadingBanner from "../shared/loading/LoadingBanner";
import ErrorBanner from "../shared/error/ErrorBanner";

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
  }, [dispatch, ]);

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

    if(error || status == "failed") return <ErrorBanner text={"Något gick fel. Försök igen."} />

  return (
    <ul className="list-unstyled">
      {meals.map((meal) => (
        <li key={meal.id} onClick={() => handleAddToCart(meal)}>
          <ProductCard product={meal} />
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

export default ProductList;
