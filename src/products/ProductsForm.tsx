import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { IProducts } from "./IProducts";
import { IVendor } from "../vendor/IVendor";
import { productsAPI } from "./ProductsAPI";
import { vendorAPI } from "../vendor/VendorAPI";
import toast from "react-hot-toast";

const emptyProducts: IProducts = {vendor: undefined, id: undefined, price: undefined, vendorId: undefined, name: "",
  categoryId: undefined,
};

function ProductsForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<IVendor[]>([]);

  async function loadVendor() {
    setVendor(await vendorAPI.list());
  }

  const { register, handleSubmit, formState: { errors } } = useForm<IProducts>({
    defaultValues: async () => {
      await loadVendor();                 
      if (!id) return emptyProducts;        
      return await productsAPI.find(Number(id)); 
    },
  });

  const save: SubmitHandler<IProducts> = async (products) => {
    try {
      delete products.vendor;               
      if (!products.id) await productsAPI.post(products);   
      else await productsAPI.put(products);                
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      return;
    }
    toast.success("Successfully saved.");
    navigate("/products");
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-75">
        <label htmlFor="name" className="form-label">Name</label>
        <input id="name" type="text"
          {...register("name", { required: "Name is required" })}
          className={`form-control ${errors?.name && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.name?.message}</div>
      </div>
      <div className="mb-3 w-25">
        <label htmlFor="price" className="form-label">Price</label>
        <input id="price" type="number" step="0.01"
          {...register("price", { valueAsNumber: true, required: "Price is required" })}
          className={`form-control ${errors?.price && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.price?.message}</div>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="vendorId" className="form-label">Vendor</label>
        <select id="vendorId"
          {...register("vendorId", {
            valueAsNumber: true,
            required: "Vendor is required",
            validate: (v) => !Number.isNaN(v) || "Vendor is required",
          })}
          className={`form-select ${errors?.vendorId && "is-invalid"}`}>
          <option value="">Select Vendors…</option>
          {vendor.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.vendorId?.message}</div>
      </div>
      <div className="d-flex justify-content-end w-75 mt-4">
        <Link to="/products" className="btn btn-outline-primary me-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">
          <svg className="bi pe-none me-1" width={16} height={16} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#save`} />
          </svg>
          Save Product
        </button>
      </div>
    </form>
  );
}

export default ProductsForm;