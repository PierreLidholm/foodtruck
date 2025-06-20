import type { CartProduct } from "../../models/cartProduct";
import CartItem from "./CartItem";

type CartListProps = {
  cartProducts: CartProduct[];
};

function CartList({ cartProducts }: CartListProps) {
  
  return (
    <ul className="list-unstyled">
      {...cartProducts.map((cartProduct, index) => {
        return <CartItem key={index} cartProduct={cartProduct} />;
      })}
    </ul>
  );
}

export default CartList;
