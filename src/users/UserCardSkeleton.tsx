function UserCardSkeleton() {
   return (
    <div className="d-flex gap-4" style={{ width: "25rem" }}>
      <div className="rounded-circle skeleton flex-shrink-0" style={{ width: "6rem", height: "6rem" }}></div>

      <div className="flex-grow-1">
        <span className="fs-4 fw-medium skeleton skeleton-text mb-2 d-block" style={{ width: "70%" }}></span>
        <span className="fs-6 fw-light skeleton skeleton-text mb-1 d-block" style={{ width: "55%" }}></span>
        <span className="fs-6 fw-light skeleton skeleton-text mb-1 d-block" style={{ width: "40%" }}></span>
        <span className="fs-6 fw-light skeleton skeleton-text mb-1 d-block" style={{ width: "60%" }}></span>
        <span className="fs-6 fw-light skeleton skeleton-text d-block" style={{ width: "65%" }}></span>
      </div>
    </div>
  );
}

export default UserCardSkeleton;