import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";

import { IRequestLines} from "./IRequestLines";
import { IProducts } from "../products/IProducts";
import { productsAPI } from "../products/ProductsAPI";
import { requestLinesAPI } from "./RequestLinesAPI";

function RequestLinesForm() {
  let { itemId, id } = useParams<{ itemId: string; id: string }>();
  const requestLinesId = Number(itemId);
  const requestsId = Number(id);
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProducts[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProducts | undefined>(undefined);

  let emptyRequestLines: IRequestLines = { id: undefined, quantity: 1, description: "", vendorId: undefined, productId: undefined, product: undefined, requests: undefined, productsId: undefined, emptyRequestLines: null };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRequestLines>({
    defaultValues: async () => {
      try {
        await loadProducts();
        if (!itemId) return emptyRequestLines;
        return await requestLinesAPI.find(requestLinesId);
      } catch (error: any) {
        toast.error(error.message, { duration: 6000 });
        return emptyRequestLines;
      }
    },
  });

  async function loadProducts() {
    const data = await productsAPI.list();
    setProducts(data);
  }

  let productsId = watch("productsId");
  let quantity = watch("quantity");

  useEffect(() => {
    let currentProducts = products.find((m) => m?.id === productsId);
    setSelectedProduct(currentProducts);
  }, [productsId]);

  const save: SubmitHandler<IRequestLines > = async (requestLines) => {
    try {
      if (!requestLines.id) {
        requestLines = await requestLinesAPI.post(requestLines);
      } else {
        await requestLinesAPI.put(requestLines);
      }
      toast.success("Successfully saved.");
      navigate(`/requests/detail/${requestLines.productId}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form className="form w-50" onSubmit={handleSubmit(save)}>
      <div className="card p-4">
        <h5 className="card-title"><strong>Item</strong></h5>

        <div className="mb-3">
          <label htmlFor="productsId" className="form-label">Menu Item</label>
          <select
            {...register("productsId", { valueAsNumber: true, required: "Menu item is required" })}
            className={`form-select ${errors?.productsId && "is-invalid"}`}
          >
            <option value="0">Select…</option>
            {products.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.productsId?.message}</div>
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

export default RequestLinesForm;