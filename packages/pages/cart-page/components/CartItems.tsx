import type { CartProduct } from "@pierre/core/models";
import { removeFromCart } from "@pierre/core/store";
import { useDispatch } from "react-redux";

type CartItemProps = {
  cartProduct: CartProduct;
};

function CartItem({ cartProduct }: CartItemProps) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <li className="text-black m-3 border-bottom border-top py-2 border-2">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fs-4">{cartProduct.product.name}</h2>
        <div className="d-flex align-items-center">
          <p className="fs-4 mb-0 me-5">{cartProduct.totalPrice} SEK</p>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleRemoveFromCart(cartProduct.product.id)}
          >
            <i className="fa-solid fa-trash-can text-white px-2"></i>
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
