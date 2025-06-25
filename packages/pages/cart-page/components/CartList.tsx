import type { CartProduct } from "@pierre/core/models";
import CartItem from "./CartItems";


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
