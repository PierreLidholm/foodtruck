import type { Product } from "../../models/product";

type SideItemsCardProps = { 
  products: Product[];
  type: "dip" | "drink";
}


function SideItemCard({products, type}: SideItemsCardProps) {

  return ( 
    <article className="card mb-1 bg-transparent rounded-0 text-white px-0 border-0">
      <header className="d-flex justify-content-between align-items-center">
        <h2 className="mb-1"> {type === "dip" ? "DIPSÅS" : "DRICKA"}</h2>
        <p className="mb-1">19 SEK</p>
      </header>
      <div className="row mt-2 d-flex">
        {products.map((product) => (
          <div key={product.id} className="col-4 p-2 d-flex">
            <div className="bg-black text-white p-2 h-100 flex-fill text-center">
              <p className="small m-0">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </article> 
  );
}

export default SideItemCard;