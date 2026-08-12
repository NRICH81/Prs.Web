
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import toast from "react-hot-toast";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import type { IProduct } from "./IProduct";
import { productAPI } from "./ProductAPI";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const PAGE_SIZE = 12;

function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const productCardSkeletons = Array.from(Array(12), (_value, index) => (
    <ProductCardSkeleton key={index} />
  ));

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  function removeProducts(deleted: IProduct) {
    setProducts(products.filter((product) => product.id !== deleted.id));
  }

  useEffect(() => {
    void (async () => {
      setLoading(true);

      try {
        const { items, totalCount } = await productAPI.list(pageNumber, PAGE_SIZE);
        setProducts(items);
        setTotalCount(totalCount);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      } finally {
        setLoading(false);
      }
    })();
  }, [pageNumber]);

  return (
    <section className="content container-fluid mx-5 my-2 py-4 ">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Products</h2>

        <Link to="/products/create" className="btn btn-outline-primary">
          <svg className="bi pe-none me-1" width={16} height={16} fill="currentColor">
            <use xlinkHref={`${bootstrapIcons}#plus`} />
          </svg>
          Add Item
        </Link>
      </div>
      <section className="list d-flex flex-row flex-wrap gap-5 p-4">
        {loading && <p>Loading…</p>}
        {loading && productCardSkeletons}
        {!loading && products.length === 0 && <p className="text-muted">No products yet.</p>}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onRemove={removeProducts} />
        ))}
      </section>
      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
            />
            {Array.from(Array(totalPages), (_value, index) => index + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === pageNumber}
                onClick={() => setPageNumber(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={pageNumber >= totalPages}
              onClick={() => setPageNumber((current) => Math.min(totalPages, current + 1))}
            />
          </Pagination>
        </div>
      )}
    </section>
  );
}


export default ProductsPage;