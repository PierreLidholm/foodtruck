import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import ProductCard from "./FoodCard";
import { useEffect, useMemo } from "react";
import { fetchProducts } from "../../reducers/productReducer";
import { fetchAuthorization } from "../../reducers/authorizationReducer";
import type { Product } from "../../models/product";
import SideItemsCard from "./SideItemsCard";
import { addToCart } from "../../reducers/cartReducer";

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.authorization);
  const products: Product[] = useSelector(
    (state: RootState) => state.product.data
  );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    if (auth.status === "idle") {
      dispatch(fetchAuthorization());
    }
  }, [auth.status, dispatch]);

  useEffect(() => {
    if (auth.status === "success" && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [auth.status, dispatch, products.length]);

  const meals: Product[] = useMemo(() => {
    return products.filter((product) => product.type === "wonton");
  }, [products]);

  const dips = useMemo(() => {
    return products.filter((product) => product.type === "dip");
  }, [products]);

  const drinks = useMemo(() => {
    return products.filter((product) => product.type === "drink");
  }, [products]);

  return (
    <ul className="list-unstyled">
      {meals.map((meal) => (
        <li key={meal.id} onClick={() => handleAddToCart(meal)}>
          <ProductCard product={meal} />
        </li>
      ))}
      <li>
        <SideItemsCard products={dips} type="dip" />
      </li>
      <li>
        <SideItemsCard products={drinks} type="drink" />
      </li>
    </ul>
  );
}

export default ProductList;
