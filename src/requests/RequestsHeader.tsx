import { IRequests } from "./IRequests";
import { getTextBackgroundByStatus } from "../utility/formatUtilities";

interface IRequestsHeaderProps {
  request: IRequests;
}

function RequestsHeader({ request }: IRequestsHeaderProps) {
  return (
    <section className="d-flex flex-wrap gap-4 justify-content-between pe-5">
      <dl>
       
        <dt>Description</dt>
        <dd>{request.description || "—"}</dd>
        
        <dt>Justification</dt>
        <dd>{request.justification || "—"}</dd>
      </dl>
      <dl>
        <dt>Delivery Mode</dt>
        <dd>{request.deliveryMode || "—"}</dd>
     
        <dt>Status</dt>
        <dd>
          <span className={`badge ${getTextBackgroundByStatus(request.status)}`}>
            {request.status?.toUpperCase()}
          </span>
        </dd>
        
      </dl>
      <dl>
        <dt>Requested By</dt>
        <dd>{request.user?.firstName} {request.user?.lastName}</dd>

        {request.status?.toUpperCase() === "REJECTED" && (
          <>
            <dt>Rejection Reason</dt>
            <dd>{request.rejectionReason || ""}</dd>
          
          </>
        )}
      </dl>
    </section>
  );
}

export default RequestsHeader;