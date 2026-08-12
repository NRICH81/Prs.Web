import { Link, useNavigate, useParams } from "react-router-dom";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IUsers } from "./IUsers";
import { userAPI } from "./UserAPI";
import toast from "react-hot-toast";

const emptyUser: IUsers = {
  id: undefined,
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  isReviewer: false,
  isAdmin: false,

};

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUsers>({
    defaultValues: async () => {
      if (!id) return emptyUser;
      return await userAPI.find(Number(id));
    },
  });

  const save: SubmitHandler<IUsers> = async (User) => {
    try {
      if (!User.id) await userAPI.post(User);
      else await userAPI.put(User);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      return;
    }

    toast.success("Successfully saved.");
    navigate("/Users");
  };

  return (
    <form className="d-flex flex-wrap w-75 gap-2" onSubmit={handleSubmit(save)}>
      <div className="mb-3 w-50">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          id="firstName"
          type="text"
          maxLength={30}
          {...register("firstName", {
            required: "First name is required",
            maxLength: { value: 30, message: "First name is too long" },
          })}
          className={`form-control ${errors?.firstName ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors?.firstName?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          id="lastName"
          type="text"
          maxLength={30}
          {...register("lastName", {
            required: "Last name is required",
            maxLength: { value: 30, message: "Last name is too long" },
          })}
          className={`form-control ${errors?.lastName ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors?.lastName?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          id="username"
          type="text"
          maxLength={50}
          {...register("username", {
            required: "Username is required",
            maxLength: { value: 50, message: "Username is too long" },
          })}
          className={`form-control ${errors?.username ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors?.username?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          type="password"
          maxLength={60}
          {...register("password", {
            required: "Password is required",
            maxLength: { value: 60, message: "Password is too long" },
          })}
          className={`form-control ${errors?.password ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors?.password?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          type="email"
          maxLength={255}
          {...register("email", {
            pattern: { value: /^$|^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            maxLength: { value: 255, message: "Email is too long" },
          })}
          className={`form-control ${errors?.email ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors?.email?.message}</div>
      </div>

      <div className="mb-3 w-50">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          id="phone"
          type="text"
          maxLength={12}
          {...register("phone", {
            maxLength: { value: 12, message: "Phone is too long" },
          })}
          className={`form-control ${errors?.phone ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors?.phone?.message}</div>
      </div>

      <div className="mb-3 w-100">
        <div className="form-label d-block">Roles</div>
        <div className="form-check form-check-inline">
          <input {...register("isReviewer")} type="checkbox" className="form-check-input" id="isReviewer" />
          <label className="form-check-label" htmlFor="isReviewer">Reviewer</label>
        </div>
        <div className="form-check form-check-inline">
          <input {...register("isAdmin")} type="checkbox" className="form-check-input" id="isAdmin" />
          <label className="form-check-label" htmlFor="isAdmin">Admin</label>
        </div>
        
      </div>

      <div className="d-flex justify-content-end w-50 mt-4">
        <Link to="/Users" className="btn btn-outline-primary me-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">
          <svg className="bi pe-none me-1" width={16} height={16} fill="#FFFFFF">
            <use xlinkHref={`${bootstrapIcons}#save`} />
          </svg>
          Save User
        </button>
      </div>
    </form>
  );
}

export default UserForm;