import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { IRequestLine} from "./IRequestLine";
import { IProduct } from "../products/IProducts";
import { productAPI } from "../products/ProductsAPI";
import { requestLineAPI } from "./RequestLineAPI";

function RequestLineForm() {
const { id, itemId } = useParams<{ id: string; itemId: string }>();
const requestsId = Number(id);
const RequestLineId = Number(itemId);
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);

  const emptyRequestLine: IRequestLine = { id: undefined, product: undefined, quantity: 1, description: "", vendorId: undefined,  productId: undefined, requests: undefined, requestId: requestsId, emptyRequestLine: null };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRequestLine>({
defaultValues: async () => {
  try {
    await loadProducts();
    if (!itemId) return emptyRequestLine;
    return await requestLineAPI.find(RequestLineId);
  } catch (error: unknown) {
    toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
    return emptyRequestLine;
  }
},
  });

  async function loadProducts() {
    const data = await productAPI.list();
    setProducts(data);
  }

  const productId = watch("productId");
  const quantity = watch("quantity");

  useEffect(() => {
    const currentProducts = products.find((m) => m?.id === productId);
    setSelectedProduct(currentProducts);
  }, [productId, products]);

const save: SubmitHandler<IRequestLine> = async (RequestLine) => {
    try {
      RequestLine.requestId = requestsId;   // always tie the line back to its parent request
      if (!RequestLine.id) {
        RequestLine = await requestLineAPI.post(RequestLine);
      } else {
        await requestLineAPI.put(RequestLine);
      }
      toast.success("Successfully saved.");
      navigate(`/requests/detail/${requestsId}`);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    }
  };

  return (
    <form className="form w-50" onSubmit={handleSubmit(save)}>
      <div className="card p-4">
        <h5 className="card-title"><strong>Item</strong></h5>

        <div className="mb-3">
          <label htmlFor="productId" className="form-label">Menu Item</label>
          <select
            {...register("productId", { valueAsNumber: true, required: "Menu item is required" })}
            className={`form-select ${errors?.productId && "is-invalid"}`}
          >
            <option value="0">Select…</option>
            {products.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.productId?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <div className="form-label">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
              .format(selectedProduct?.price ?? 0)}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input id="quantity" type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              valueAsNumber: true,
            })}
            className={`form-control ${errors?.quantity && "is-invalid"}`} />
          <div className="invalid-feedback">{errors?.quantity?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <input id="notes" type="text" {...register("description")}
            className="form-control"
            placeholder="Enter any notes for this item (optional)" />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <div className="form-label">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
              .format((selectedProduct?.price ?? 0) * quantity)}
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Link to={`/requests/detail/${requestsId}`} className="btn btn-outline-primary me-2">Cancel</Link>
          <button type="submit" className="btn btn-primary">
            <svg className="bi pe-none me-1" width={16} height={16} fill="#FFFFFF">
              <use xlinkHref={`${bootstrapIcons}#save`} />
            </svg>
            Save item
          </button>
        </div>
      </div>
    </form>
  );
}

export default RequestLineForm;