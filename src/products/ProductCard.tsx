import { IProduct } from "./IProduct";
 import { Link } from "react-router-dom";
 import Dropdown from "react-bootstrap/Dropdown";
 import bootstrapIcons from "../assets/bootstrap-icons.svg";
 import { productAPI } from "./ProductAPI";
 import { money } from "../utility/formatUtilities";
 import toast from "react-hot-toast";

interface IProductCardProps {
  product: IProduct;
  onRemove: (product: IProduct) => void;
}

function ProductCard({ product, onRemove }: IProductCardProps) {
  return (
    <div className="card p-4" style={{ width: "23rem" }}>
      <div className="progress">
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: "60%" }}></div>
      </div>
             <div className="d-flex justify-content-end">
         <Dropdown>
           <Dropdown.Toggle className="btn btn-light no-caret" style={{ background: "none" }}>
             <svg className="bi pe-none" width={20} height={20} fill="#007AFF">
               <use xlinkHref={`${bootstrapIcons}#three-dots-vertical`} />
             </svg>
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item as={Link} to={`/products/edit/${product.id}`}>Edit</Dropdown.Item>
             <Dropdown.Item as="a" href="#" onClick={async (event) => {
               event.preventDefault();
               if (confirm("Are you sure you want to delete this product?") && product.id) {
                 try {
                   await productAPI.delete(product.id);
                   onRemove(product);
                   toast.success("Successfully deleted.");
                 } catch (error: unknown) {
                   toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
                 }
               }
             }}>Delete</Dropdown.Item>
          </Dropdown.Menu>
         </Dropdown>
       </div>
      <span className="fs-4 fw-medium">{product.name}</span>
      <span className="fs-5 fw-light">
        {product.price != null ? money(product.price) : ""}
        {product.unit && ` / ${product.unit}`}
      </span>
      <span className="text-muted">{product.vendor?.name}</span>
      {product.partNumber && (
        <div className="badge text bg-secondary mt-1 align-self-start">{product.partNumber}</div>
      )}
    </div>
  );
}

export default ProductCard;