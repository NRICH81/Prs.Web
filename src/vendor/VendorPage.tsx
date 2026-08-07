import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";
import VendorCard from "./VendorCard";
import VendorCardSkeleton from "./VendorCardSkeleton";

function VendorPage() {
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState<IVendor[]>([]);
  const VendorCardSkeletons = Array.from(Array(12), (_value, index) => (
    <VendorCardSkeleton key={index} />
  ));

  function removeVendor(vendorToRemove: IVendor) {
    setVendor((currentVendor) =>
      currentVendor.filter((vendor) => vendor.id !== vendorToRemove.id)
    );
  }

  useEffect(() => {
    void (async () => {
      setLoading(true);

      try {
        const data = await vendorAPI.list();
        setVendor(data.toSorted((a: IVendor, b: IVendor) => a.sortVendor - b.sortVendor));
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="content container-fluid mx-5 my-2 py-4 ">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Vendor ({vendor.length})</h2>
        <Link to="/vendor/create" className="btn btn-primary">Add Vendor</Link>
      </div>

      <section className="list d-flex flex-row flex-wrap gap-5 p-4">
        {loading && <p>Loading…</p>}
        {loading && VendorCardSkeletons}
        {vendor.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onRemove={removeVendor} />
        ))}
      </section>
    </section>
  );
}

export default VendorPage;
