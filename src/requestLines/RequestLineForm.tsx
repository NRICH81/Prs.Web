import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { IRequestLine} from "./IRequestLine";
import { IProduct } from "../products/IProduct";
import { productAPI } from "../products/ProductAPI";
import { requestLineAPI } from "./RequestLineAPI";

function RequestLineForm() {
const { id, itemId } = useParams<{ id: string; itemId: string }>();
const requestsId = Number(id);
const requestLineId = Number(itemId);
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);

  const emptyRequestLine: IRequestLine = { id: undefined, product: undefined, quantity: 1, description: "", vendorId: undefined,  productId: undefined, requests: undefined, requestId: requestsId, emptyRequestLine: null };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IRequestLine>({
defaultValues: async () => {
  try {
    await loadProducts();
    if (!itemId) return emptyRequestLine;
    return await requestLineAPI.find(requestLineId);
  } catch (error: unknown) {
    toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
    return emptyRequestLine;
  }
},
  });

  async function loadProducts() {
    const { items } = await productAPI.list(1, 1000);
    setProducts(items);
  }

  const productId = watch("productId");
  const quantity = watch("quantity");

  useEffect(() => {
    const currentProducts = products.find((m) => m?.id === productId);
    setSelectedProduct(currentProducts);
  }, [productId, products]);

const save: SubmitHandler<IRequestLine> = async (requestLine) => {
    try {
      requestLine.requestId = requestsId;   
      if (!requestLine.id) {
        requestLine = await requestLineAPI.post(requestLine);
      } else {
        await requestLineAPI.put(requestLine);
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
          <Controller
            name="productId"
            control={control}
            rules={{ required: "Menu item is required" }}
            render={({ field }) => (
              <Typeahead
                id="productId"
                labelKey="name"
                placeholder="Search for a menu item…"
                options={products}
                selected={products.filter((m) => m.id === field.value)}
                onChange={(selected) => field.onChange((selected[0] as IProduct | undefined)?.id)}
                onBlur={field.onBlur}
                isInvalid={!!errors?.productId}
              />
            )}
          />
          <div className="invalid-feedback" style={{ display: errors?.productId ? "block" : "none" }}>
            {errors?.productId?.message}
          </div>
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
          <input id="quantity" type="number" min={1}
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              valueAsNumber: true,
            })}
            className={`form-control ${errors?.quantity && "is-invalid"}`} />
          <div className="invalid-feedback">{errors?.quantity?.message}</div>
          
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