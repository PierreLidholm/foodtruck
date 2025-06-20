import ProductList from "./products/ProductList";

function MenuPage() {

  return (
    <section className="menu h-100 mt-3">
      <div className="bg-secondary text-start text-white rounded-1 p-3">
        <h2 >Meny</h2>
        <ProductList />
      </div>
    </section>
  );
}

export default MenuPage;