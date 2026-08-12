import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import type { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";
import VendorCard from "./VendorCard";
import VendorCardSkeleton from "./VendorCardSkeleton";




function VendorsPage() {
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState<IVendor[]>([]);
  const vendorCardSkeletons = Array.from(Array(12), (_value, index) => (
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
        setVendor(data.toSorted((a, b) => a.name.localeCompare(b.name)));
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="content container-fluid mx-3 my-2 py-4 ">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2 ">
        
        <h2>Vendor ({vendor.length})</h2>
       <Link to="/vendors/create" className="btn btn-outline-primary">
  <svg className="bi pe-none me-1" width={16} height={16} fill="currentColor">
    <use xlinkHref={`${bootstrapIcons}#plus`} />
  </svg>
 Create A Vendor
</Link>
       
      </div>


      <section className="list d-flex flex-row flex-wrap gap-5 -4">
        
        {loading && <p>Loading…</p>}
        {loading && vendorCardSkeletons}
        {!loading && vendor.length === 0 && <p className="text-muted">No vendors yet.</p>}
        
        {vendor.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onRemove={removeVendor} />

        ))}
      </section>
    </section>
  );
}

export default VendorsPage;
