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
    <section className="content container-fluid mx-4 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Vendor</h2>
        {vendor && (
          <Link to={`/vendors/edit/${vendor.id}`} className="btn btn-outline-primary">
            Edit
          </Link>
        )}
      </div>
      {loading && <p>Loading…</p>}
      {vendor && (
        <dl className="d-flex flex-wrap gap-4 mb-0">
          <div>
            <dt>Code</dt>
            <dd>{vendor.code}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>{vendor.name}</dd>
          </div>
          <div>
            <dt>Address</dt>
            <dd>{vendor.address}</dd>
          </div>
          <div>
            <dt>City</dt>
            <dd>{vendor.city}</dd>
          </div>
          <div>
            <dt>State</dt>
            <dd>{vendor.state}</dd>
          </div>
          <div>
            <dt>Zip</dt>
            <dd>{vendor.zip}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{vendor.phone}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{vendor.email}</dd>
          </div>
        </dl>
      )}
    </section>
  );
}

export default VendorDetailPage;
