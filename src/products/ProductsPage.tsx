// src/products/ProductsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { IProducts } from "./IProducts";
import { productsAPI } from "./ProductsAPI";
import ProductsCard from "./ProductsCard";
import ProductsCardSkeleton from "./ProductsCardSkeleton";

function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProducts[]>([]);
  const ProductsCardSkeletons = Array.from(Array(12), (_value, index) => (
    <ProductsCardSkeleton key={index} />
  ));

  function removeProducts(deleted: IProducts) {
    setProducts(products.filter((products) => products.id !== deleted.id));
  }

  useEffect(() => {
    void (async () => {
      setLoading(true);

      try {
        const data = await productsAPI.list();
        setProducts(data);
      } catch (error: any) {
        toast.error(error.message, { duration: 6000 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4 ">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Products</h2>

        <Link to="/products/create" className="btn btn-primary">Add Item</Link>
      </div>
      <section className="list d-flex flex-row flex-wrap gap-5 p-4">
        {loading && <p>Loading…</p>}
        {loading && ProductsCardSkeletons}
        {products.map((product) => (
          <ProductsCard key={product.id} products={product} onRemove={removeProducts} />
        ))}
      </section>
    </section>
  );
}

export default ProductsPage;