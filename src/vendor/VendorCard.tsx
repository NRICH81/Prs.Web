import type { IVendor } from "./IVendor";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { vendorAPI } from "./VendorAPI";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface IVendorCardProps {
  vendor: IVendor;
  onRemove: (vendor: IVendor) => void;
}

function VendorCard({ vendor, onRemove }: IVendorCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <div className="d-flex justify-content-end">
        <Dropdown className="d-inline">
          <Dropdown.Toggle className="btn btn-light no-caret" style={{ background: "none" }}>
            <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
              <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/vendor/detail/${vendor.id}`}>View</Dropdown.Item>
            <Dropdown.Item as={Link} to={`/vendor/edit/${vendor.id}`}>Edit</Dropdown.Item>
            <Dropdown.Item
              as="a"
              href="#"
              onClick={async (event) => {
                event.preventDefault();
                if (confirm("delete this vendor?") && vendor.id) {
                  try {
                    await vendorAPI.delete(vendor.id);
                    onRemove(vendor);
                    toast.success("Successfully deleted.");
                  } catch (error: any) {
                    toast.error(error.message, { duration: 6000 });
                  }
                }
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <span className="fs-4 fw-medium">{vendor.name}</span>
      <span className="text-secondary">Sort Vendor: {vendor.sortVendor}</span>
    </div>
  );
}

export default VendorCard;
