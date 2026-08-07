import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import type { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";

function VendorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState<IVendor | undefined>(undefined);

  useEffect(() => {
    const vendorId = Number(id);

    void (async () => {
      setLoading(true);
      try {
        setVendor(await vendorAPI.find(vendorId));
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Vendor</h2>
        {vendor && (
          <Link to={`/vendor/edit/${vendor.id}`} className="btn btn-outline-primary">
            Edit
          </Link>
        )}
      </div>
      {loading && <p>Loading…</p>}
      {vendor && (
        <dl className="d-flex flex-wrap gap-4 mb-0">
          <div>
            <dt>Name</dt>
            <dd>{vendor.name}</dd>
          </div>
          <div>
            <dt>Sort Order</dt>
            <dd>{vendor.sortVendor}</dd>
          </div>
        </dl>
      )}
    </section>
  );
}

export default VendorDetailPage;
