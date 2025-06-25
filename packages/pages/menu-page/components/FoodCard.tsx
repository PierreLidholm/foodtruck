import type { Product } from "@pierre/core/models";

type ProductCardProps = {
  product: Product;
};

function FoodCard({ product }: ProductCardProps) {
  return (
    <article className="card mb-1 bg-transparent rounded-0 text-dark px-0 border-0">
      <header className="d-flex justify-content-between align-items-center">
        <h2 className="mb-1 fs-4">{product.name}</h2>
        <p className="mb-1 fs-4">{product.price} SEK</p>
      </header>
      <section className="d-flex justify-content-between align-items-center ">
        <p className="mb-1">{product.ingredients?.join(", ")}</p>
      </section>
    </article>
  );
}

export { FoodCard };
