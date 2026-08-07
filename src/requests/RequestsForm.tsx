import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type { IRequests } from "./IRequests";
import type { IUsers} from "../users/IUsers";
import { requestsAPI } from "./RequestsAPI";
import { userAPI } from "../users/UserAPI";
import { useUserContext } from "../App";
import toast from "react-hot-toast";

function RequestsForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { user: user } = useUserContext();
  const [userList, setUserList] = useState<IUsers[]>([]);

  async function loadUser() {
    setUserList(await userAPI.list());
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequests>({
    defaultValues: async () => {
      const emptyRequest: IRequests = {
          id: undefined, user: undefined, status: "REJECTION", rejectionReason: null, requestLines: [],userId: undefined,
        description: undefined, justification: undefined, deliveryMode: undefined, total: undefined, 
        orderNumber: undefined, firstName: undefined, lastName: undefined, vendorId: undefined, emptyRequest: null
      };

      await loadUser();
      if (!id) {
        emptyRequest.user = user?.firstName + " " + user?.lastName;
        return emptyRequest;
      }

      return await requestsAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IRequests> = async (request) => {
    try {
      delete request.user;
      if (!request.id) {
        const newRequest = await requestsAPI.post(request);
        navigate(`/requests/detail/${newRequest.id}`);
      } else {
        await requestsAPI.put(request);
        navigate(`/requests/detail/${request.id}`);
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-4" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-50">
        <label htmlFor="tableNumber" className="form-label">Table Number</label>
        <input
          id="tableNumber"
          type="number"
          {...register("orderNumber", {
            required: "Table number is required",
            valueAsNumber: true,
          })}
          className={`form-control ${errors?.orderNumber ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors?.orderNumber?.message}</div>
      </div>

      <div className="mb-3 w-75">
        <label htmlFor="notes" className="form-label">Notes</label>
        <textarea
          id="notes"
          rows={3}
          {...register("description")}
          className="form-control"
        ></textarea>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          id="status"
          defaultValue="PLACED"
          disabled={!isEdit}
          {...register("status", { required: "Status is required" })}
          className={`form-select ${errors?.status ? "is-invalid" : ""}`}
        >
          <option value="PLACED">Approved</option>
          <option value="PREPARING">New</option>
          <option value="READY">Review</option>
          <option value="SERVED">Rejected</option>
        
        </select>
        <div className="invalid-feedback">{errors?.status?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="userId" className="form-label">User</label>
        <select
          id="userId"
          disabled
          {...register("userId", {
            required: "User is required",
            valueAsNumber: true,
          })}
          className={`form-select ${errors?.userId ? "is-invalid" : ""}`}
        >
          {userList.map((s) => (
            <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
          ))}
        </select>
        <div className="invalid-feedback">{errors?.userId?.message}</div>
      </div>

      <div className="d-flex justify-content-end w-75 mt-4">
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
