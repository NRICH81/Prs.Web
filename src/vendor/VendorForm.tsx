import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import type { IVendor } from "./IVendor";
import { vendorAPI } from "./VendorAPI";
import toast from "react-hot-toast";

const emptyVendor: IVendor = {
  id: undefined,
  code: "",
  name: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
};
const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];


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
    navigate("/vendors");
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-25">
        <label htmlFor="code" className="form-label">Vendor Code</label>
        <input id="code" type="text"
          {...register("code", { required: "Code is required" })}
          className={`form-control ${errors?.code && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.code?.message}</div>
      </div>
      <div className="mb-3 w-75">
        <label htmlFor="name" className="form-label">Name</label>
        <input id="name" type="text"
          {...register("name", { required: "Name is required" })}
          className={`form-control ${errors?.name && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.name?.message}</div>
      </div>
      <div className="mb-3 w-100">
        <label htmlFor="address" className="form-label">Address</label>
        <input id="address" type="text"
          {...register("address", { required: "Address is required" })}
          className={`form-control ${errors?.address && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.address?.message}</div>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="city" className="form-label">City</label>
        <input id="city" type="text"
          {...register("city", { required: "City is required" })}
          className={`form-control ${errors?.city && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.city?.message}</div>
      </div>
      <div className="mb-3 w-25">
  <label htmlFor="state" className="form-label">State</label>
  <select id="state"
    {...register("state", { required: "State is required" })}
    className={`form-select ${errors?.state && "is-invalid"}`}>
    <option value="">Select State…</option>
    {US_STATES.map((abbr) => (
      <option key={abbr} value={abbr}>{abbr}</option>
    ))}
  </select>
  <div className="invalid-feedback">{errors?.state?.message}</div>
</div>
      <div className="mb-3 w-20">
        <label htmlFor="zip" className="form-label">Zip</label>
        <input id="zip" type="text"
          {...register("zip", { required: "Zip is required" })}
          className={`form-control ${errors?.zip && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.zip?.message}</div>
      </div>
      <div className="mb-3 w-25">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input id="phone" type="text"
          {...register("phone")}
          className={`form-control ${errors?.phone && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.phone?.message}</div>
      </div>
      <div className="mb-3 w-50">
        <label htmlFor="email" className="form-label">Email</label>
        <input id="email" type="email"
          {...register("email")}
          className={`form-control ${errors?.email && "is-invalid"}`} />
        <div className="invalid-feedback">{errors?.email?.message}</div>
      </div>
      <div className="d-flex justify-content-end w-100 mt-4">
        <Link to="/vendors" className="btn btn-outline-primary me-2">Cancel</Link>
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
