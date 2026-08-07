import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import type { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";
import toast from "react-hot-toast";

const emptyVendor: IVendor = { id: undefined, name: "", sortVendor: 0 };


function VendorForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { register, handleSubmit, formState: { errors } } = useForm<IVendor>({
    defaultValues: async () => {
      if (!id) return emptyVendor;
      return await vendorAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IVendor> = async (vendor) => {
    try {
      if (!vendor.id) await vendorAPI.post(vendor);
      else await vendorAPI.put(vendor);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      return;
    }
    toast.success("Successfully saved.");
    navigate("/vendor");
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
        <label htmlFor="sortVendor" className="form-label">Sort Order</label>
        <input id="sortVendor" type="number"
          {...register("sortVendor", { valueAsNumber: true, required: "Sort order is required" })}
          className={`form-control ${errors?.sortVendor && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.sortVendor?.message}</div>
      </div>
      <div className="d-flex justify-content-end w-75 mt-4">
        <Link to="/vendor" className="btn btn-outline-primary me-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">
          <svg className="bi pe-none me-1" width={16} height={16} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#save`} />
          </svg>
          Save vendor
        </button>
      </div>
    </form>
  );
}

export default VendorForm;
