import { IRequests } from "./IRequests";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";

interface IRequestsHeaderProps {
  request: IRequests;
}

function RequestsHeader({ request }: IRequestsHeaderProps) {
  return (
    <section className="d-flex flex-wrap gap-4 justify-content-between pe-5">
      <dl>
        <dt>#</dt>
        <dd>{request.orderNumber}</dd>
        <dt>Description</dt>
        <dd>{request.description || "—"}</dd>
      </dl>
      <dl>
        <dt>Status</dt>
        <dd>
          <span className={`badge ${getTextBackgroundByStatus(request.status)}`}>
            {request.status}
          </span>
        </dd>
        <dt>Total</dt>
        <dd>
          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
            .format(request.total ?? 0)}
        </dd>
      </dl>
      <dl>
        <dt>User</dt>
        <dd>{request.user?.firstName} {request.user?.lastName}</dd>
        
        
        
      </dl>
    </section>
  );
}

export default RequestsHeader;