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
    <div className="card p-3" style={{ width: "15rem" }}>
      <div className="d-flex justify-content-between align-items-">
        
        <span className="fs-5 fw-medium fw-bold">{vendor.name}</span>
              
        <Dropdown className="d-inline">
          <Dropdown.Toggle className="btn btn-light no-caret " style={{ background: "none" }}>
            <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
              
              <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
          
            </svg>
            
          </Dropdown.Toggle>
       
          <Dropdown.Menu>
            
            <Dropdown.Item as={Link} to={`/vendors/detail/${vendor.id}`}>View</Dropdown.Item>
            
            <Dropdown.Item as={Link} to={`/vendors/edit/${vendor.id}`}>Edit</Dropdown.Item>
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
                  } catch (error: unknown) {
                    toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
                  }
                }
              }}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="badge text bg-secondary mt-1 align-self-start">{vendor.code}</div>
      <span>{vendor.address}</span>
      <span>{vendor.city}, {vendor.state}</span>
      <span>{vendor.zip}</span>
      <span>{vendor.phone}</span>
      <span>{vendor.email}</span>
      <div className="progress">
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "60%" }}></div>
      </div>
    </div>
  );
}

export default VendorCard;
