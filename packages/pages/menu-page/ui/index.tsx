import "./index.css";
import { ProductList } from "../components/ProductList";

import { menuBg } from "@pierre/core/assets";
function MenuPage() {
  return (
    <section className="menu" style={{ backgroundImage: `url(${menuBg})` }}>
      <div className="text-start text-white  ">
        <div
          className="container mt-5 p-3 mb-5"
          style={{ backgroundColor: "#605858" }}
        >
          <h2>Meny</h2>
          <ProductList />
        </div>
      </div>
    </section>
  );
}

export { MenuPage };
