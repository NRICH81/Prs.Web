import { useEffect, useState, SyntheticEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { IRequest } from "./IRequest";
import { requestAPI } from "./RequestAPI";
import RequestRow from "./RequestRow";

interface ISortableColumn {
  label: string;
  sortKey: string;
}

const columns: ISortableColumn[] = [
  { label: "Description", sortKey: "description" },
  { label: "Justification", sortKey: "justification" },
  { label: "Status", sortKey: "status" },
  { label: "Total", sortKey: "total" },
  { label: "Requested By", sortKey: "requestedBy" },
];

function RequestsPage() {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") ?? undefined;
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const sortDir = searchParams.get("sortDir") ?? "asc";

  function removeRequest(request: IRequest) {
    setRequests(requests.filter((o) => o.id !== request.id));
  }

  useEffect(() => {
    void (async () => {
      setLoading(true);

      try {
        const data = await requestAPI.list(status, sortBy, sortDir);
        setRequests(data);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Unexpected error", { duration: 6000 });
      } finally {
        setLoading(false);
      }
    })();
  }, [status, sortBy, sortDir]);

  function handleStatusChange(event: SyntheticEvent) {
    const params = new URLSearchParams(searchParams);
    const value = (event.target as HTMLSelectElement).value;
    if (value) params.set("status", value);
    else params.delete("status");
    setSearchParams(params);
  }

  function handleSort(sortKey: string) {
    const params = new URLSearchParams(searchParams);
    if (sortBy === sortKey) {
      params.set("sortDir", sortDir === "asc" ? "desc" : "asc");
    } else {
      params.set("sortBy", sortKey);
      params.set("sortDir", "asc");
    }
    setSearchParams(params);
  }

  return (
    <section className="content container-fluid mx-3 my-2 py-4">
      <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom border-2">
        <h2>Requests</h2>
        <Link to="/requests/create" className="btn btn-outline-primary">
          <svg className="bi pe-none me-1" width={16} height={16} fill="currentColor">
            <use xlinkHref={`${bootstrapIcons}#plus`} />
          </svg>
          Add Request
        </Link>
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
          <option value="REJECTED">REJECTED</option>
        
        </select>
        {loading && <p>Loading…</p>}
        {!loading && requests.length === 0 && <p className="text-muted">No requests yet.</p>}
        {!loading && requests.length > 0 && (
          <table className="table table-hover w-75 rounded-2">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.sortKey}
                    scope="col"
                    role="button"
                    onClick={() => handleSort(column.sortKey)}
                  >
                    {column.label}
                    {sortBy === column.sortKey && (sortDir === "asc" ? " ▲" : " ▼")}
                  </th>
                ))}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <RequestRow key={request.id} request={request} onRemove={removeRequest} />
              ))}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}

export default RequestsPage;