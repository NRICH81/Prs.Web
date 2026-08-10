import { useEffect, useState, SyntheticEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IRequests } from "./IRequests";
import { requestsAPI } from "./RequestsAPI";
import RequestsRow from "./RequestsRow";

function RequestsPage() {
  const [requests, setRequests] = useState<IRequests[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") ?? undefined;

  function removeRequest(request: IRequests) {
    setRequests(requests.filter((o) => o.id !== request.id));
  }

  useEffect(() => {
    void (async () => {
      try {
        const data = await requestsAPI.list(status);
        setRequests(data);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      }
    })();
  }, [status]);

  function handleStatusChange(event: SyntheticEvent) {
    setSearchParams({ status: (event.target as HTMLSelectElement).value });
  }

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Requests</h2>
        <Link to="/requests/create" className="btn btn-primary">Add Request</Link>
      </div>
      <section className="list bg-body-tertiary p-4 rounded-4">
        <select
          id="status"
          className="form-select w-auto mb-3"
          value={searchParams.get("status") ?? ""}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="APPROVED">Approved</option>
          <option value="NEW">New</option>
          <option value="REVIEW">Review</option>
          <option value="REJECTED">Rejected</option>
        
        </select>
        <table className="table table-hover w-100 rounded-4">
                    <thead>
            <tr>
              <th scope="col"> #</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Requested By</th>
         
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <RequestsRow key={request.id} request={request} onRemove={removeRequest} />
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default RequestsPage;