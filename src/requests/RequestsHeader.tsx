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
  <dd className="text-muted small">{request.justification || "—"}</dd>
  {request.rejectionReason && (
    <>
      <dt>Rejection Reason</dt>
      <dd className="text-danger">{request.rejectionReason}</dd>
    </>
  )}
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
        <dt>Requested By</dt>
        <dd>{request.user?.firstName} {request.user?.lastName}</dd>
          <dd className="text-muted small">{request.deliveryMode || "—"}</dd>
        
        
        
      </dl>
    </section>
  );
}

export default RequestsHeader;