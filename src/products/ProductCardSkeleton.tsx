function ProductCardSkeleton() {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <div className="progress">
        <div className="progress-bar bg-secondary skeleton" role="progressbar" style={{ width: "60%" }}></div>
      </div>
      <span className="fs-4 fw-medium skeleton skeleton-text"></span>
      <span className="fs-5 fw-light skeleton skeleton-text"></span>
      <span className="skeleton skeleton-text"></span>
      <span className="badge bg-secondary mt-1 skeleton skeleton-text" style={{ width: "4rem" }}></span>
    </div>
  );
}

export default ProductCardSkeleton;