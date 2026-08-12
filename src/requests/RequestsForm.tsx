import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import type { IRequests } from "./IRequests";
import type { IUsers} from "../users/IUsers";
import { requestsAPI } from "./RequestsAPI";
import { userAPI } from "../users/UserAPI";
import { useUserContext } from "../UserContext";
import { useRequest } from "./useRequest";
import toast from "react-hot-toast";

function RequestsForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { user: user } = useUserContext();
  const [userList, setUserList] = useState<IUsers[]>([]);
  const { request: existingRequest } = useRequest(id ? Number(id) : undefined);

  useEffect(() => {
    void (async () => {
      try {
        setUserList(await userAPI.list());
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error");
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequests>({
    defaultValues: {
      id: undefined, user, status: "NEW", rejectionReason: null, requestLines: [], userId: user?.id,
      description: undefined, justification: undefined, deliveryMode: undefined, total: undefined,
    },
    values: isEdit ? existingRequest : undefined,
  });

  const save: SubmitHandler<IRequests> = async (requests) => {
    try {
      delete requests.user;
      if (!requests.id) {
        const newRequests = await requestsAPI.post(requests);
        navigate(`/requests/detail/${newRequests.id}`);
      } else {
        await requestsAPI.put(requests);
        navigate(`/requests/detail/${requests.id}`);
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
  };

   return (
    <form className="d-flex flex-wrap w-50 gap-2" onSubmit={handleSubmit(save)}>
      <div className="d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Please enter description for request."
            {...register("description", {
              required: "Description is required",
            })}
            className={`form-control ${errors?.description ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors?.description?.message}</div>
        </div>

        <div className="mb-3 w-50">
          <label htmlFor="deliveryMode" className="form-label">Delivery Method</label>
          <select
            id="deliveryMode"
            defaultValue=""
            {...register("deliveryMode", { required: "Delivery Method is required" })}
            className={`form-select ${errors?.deliveryMode ? "is-invalid" : ""}`}
          >
            <option value="">Select Delivery Method...</option>
            <option value="PICKUP">Pickup</option>
            <option value="DELIVERY">Delivery</option>
            <option value="SIGNATURE_DELIVERY">Signature Delivery</option>
          </select>
          <div className="invalid-feedback">{errors?.deliveryMode?.message}</div>
        </div>
      </div>

      <div className="d-flex flex-row w-100 gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="justification" className="form-label">Justification</label>
          <input
            id="justification"
            type="text"
            placeholder="Enter a justification for your purchase request"
            {...register("justification", { required: "Justification is required" })}
            className={`form-control ${errors?.justification ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors?.justification?.message}</div>
        </div>

        <div className="mb-3 w-50">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            defaultValue="NEW"
            disabled={!isEdit}
            {...register("status", { required: "Status is required" })}
            className={`form-select ${errors?.status ? "is-invalid" : ""}`}
          >
            <option value="NEW">NEW</option>
            <option value="REVIEW">REVIEW</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <div className="invalid-feedback">{errors?.status?.message}</div>
        </div>
      </div>

      <div className="d-flex flex-row w-100 justify-content-end gap-4">
        <div className="mb-3 w-50">
          <label htmlFor="userId" className="form-label">Requested By</label>
          <select
            id="userId"
            disabled
            value={user?.id ?? ""}
            {...register("userId", {
              required: "User is required",
              valueAsNumber: true,
            })}
            className={`form-select ${errors?.userId ? "is-invalid" : ""}`}
          >
            <option value="">Select…</option>
            {userList.map((s) => (
              <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
            ))}
          </select>
          <div className="invalid-feedback">{errors?.userId?.message}</div>
        </div>
      </div>

      <div className="d-flex justify-content-end w-100 mt-4">
        <Link to="/requests" className="btn btn-outline-primary me-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">
          <svg className="bi pe-none me-1" width={16} height={16} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#save`} />
          </svg>
          Save Request
        </button>
      </div>
    </form>
  );
}
   

export default RequestsForm;
