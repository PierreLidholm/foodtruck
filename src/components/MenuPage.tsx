import ProductList from "./products/ProductList";
import './MenuPage.css';
function MenuPage() {

  return (
    <section className="menu">
      <div className="container text-start text-dark  pt-5 p-3" style={{ backgroundColor: "rgba(200, 255, 240, 0.6)" }}>
        <h2 >Meny</h2>
        <ProductList />
      </div>
    </section>
  );
}

export default MenuPage;