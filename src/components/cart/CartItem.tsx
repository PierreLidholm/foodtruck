import type { CartProduct } from "../../models/cartProduct";

type CartItemProps = {
  cartProduct: CartProduct;
};

function CartItem({ cartProduct }: CartItemProps) {
  return (
    <li className="text-black">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fs-4">{cartProduct.product.name}</h2>
        <p className="fs-4">{cartProduct.totalPrice} SEK</p>
      </div>
    </li>
  );
}

export default CartItem;
