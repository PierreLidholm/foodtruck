
import { useSelector } from "react-redux";
import type { RootState } from "@pierre/core/store";
import type { Product } from "@pierre/core/models";
import { useNavigate } from "react-router-dom";

function Header () {
  const productsInCart: Product[] = useSelector((state: RootState) => state.cart.data.products);
  const navigate = useNavigate();

  function navigateToPage(url: string) {
    navigate(url)
  }

  return (
    <header className="p-3 header-footer-bg" role="banner" >
      <nav className="navbar  navbar-light container p-0" aria-label="Main navigation">
        <a role="button" className="navbar-brand fw-bold" onClick={() => navigateToPage(`/`)}>
          <i className="fa-solid fa-house"></i>
        </a>

      <div className="position-relative">
        <a role="button"  className="navbar-brand fw-bold m-0" onClick={() => navigateToPage(`cart`)}>
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

export {Header};