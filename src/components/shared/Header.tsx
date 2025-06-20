
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Product } from "../../models/product";
import { useNavigate } from "react-router-dom";

function Header () {
  const productsInCart: Product[] = useSelector((state: RootState) => state.cart.data.products);
  const navigate = useNavigate();

  function navigateToPage(url: string) {
    navigate(url)
  }

  return (
    <header className="bg-transparent " role="banner">
      <nav className="navbar  navbar-light container p-0" aria-label="Main navigation">
        <a className="navbar-brand fw-bold" onClick={() => navigateToPage(`/`)}>
          <i className="fa-solid fa-house"></i>
        </a>

      <div className="position-relative">
        <a className="navbar-brand fw-bold m-0" onClick={() => navigateToPage(`cart`)}>
         <i className="fa-solid fa-cart-shopping"></i>
         <p
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger small"
          >
            {productsInCart.length}
          </p>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;