import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { IRequestLine } from "../requestLine/IRequestLine";
import { requestLineAPI } from "../requestLine/RequestLineAPI";
import { requestsAPI } from "./RequestsAPI";
import RequestsHeader from "./RequestsHeader";
import { money } from "../utility/formatUtilities";
import bootstrapIcons from "../assets/bootstrap-icons.svg";
import { useRequest } from "./useRequest";
import { useUserContext } from "../UserContext";

function RequestsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { request: requests, loading, reload: loadRequest } = useRequest(id ? Number(id) : undefined);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const isOwnRequest = !!user && !!requests && user.id === requests.userId;
  // Computed client-side (not requests.total) so the footer always reflects the current line items.
  const total = requests?.requestLines?.reduce(
    (sum, requestLine) => sum + (requestLine.product?.price ?? 0) * requestLine.quantity, 0
  ) ?? 0;

  async function sendForReview() {
    if (!requests?.id) return;
    try {
      await requestsAPI.review(requests.id);
      toast.success("Request sent for review.");
      navigate("/requests");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  async function approve() {
    if (!requests?.id) return;
    try {
      await requestsAPI.approve(requests.id);
      toast.success("Request approved.");
      navigate("/requests");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");

  function handleShowRejectModal() { setShowRejectModal(true); }
  function handleCloseRejectModal() { setShowRejectModal(false); setRejectReason(""); setRejectError(""); }

  async function reject() {
    if (!rejectReason.trim()) { setRejectError("Rejection reason is required."); return; }
    if (!requests?.id) return;
    try {
      await requestsAPI.reject(requests.id, rejectReason);
      handleCloseRejectModal();
      toast.success("Request REJECTED.");
      navigate("/requests");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  const [requestLineToDelete, setRequestLineToDelete] = useState<IRequestLine | undefined>(undefined);


  function handleShowDeleteItemModal(requestLine: IRequestLine) { setRequestLineToDelete(requestLine); }
  function handleCloseDeleteItemModal() { setRequestLineToDelete(undefined); }

  async function removeRequestLine() {
    if (!requestLineToDelete?.id) return;
    try {
      await requestLineAPI.delete(requestLineToDelete.id);
      setRequestLineToDelete(undefined);
      toast.success("Successfully deleted.");
      await loadRequest();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Request </h2>
        <div className="d-flex justify-content-end gap-2">
          {requests?.id && (
            <Link to={`/requests/edit/${requests.id}`} className="btn btn-outline-primary" title="Edit">
              <svg className="bi pe-none" width={16} height={16} fill="currentColor">
                <use xlinkHref={`${bootstrapIcons}#pencil`} />
              </svg>
            </Link>
          )}
          {requests?.status?.toUpperCase() === "NEW" && (
            <button className="btn btn-primary" onClick={sendForReview}>Send for Review</button>
          )}
          {requests?.status?.toUpperCase() === "REVIEW" && (
            <>
              <button className="btn btn-success" onClick={approve} disabled={isOwnRequest} title="Approve">Approve</button>
              <button className="btn btn-outline-danger" onClick={handleShowRejectModal} disabled={isOwnRequest} title="REJECTED">Reject</button>
            </>
          )}
        </div>
      </div>
      {loading && <p>Loading…</p>}
      {requests?.status?.toUpperCase() === "REVIEW" && isOwnRequest && (
        <div className="alert alert-warning" role="alert">
          You cannot approve or reject a request you submitted yourself.
        </div>
      )}
      {requests && <RequestsHeader request={requests} />}
      {requests && (
        <div className="card p-4 mt-5">
          <h5 className="card-title">Requests</h5>
          <table className="table w-75">
            <thead>
              <tr>
                <th>Products</th><th>Price</th><th>Quantity</th><th>Amount</th><th />
              </tr>
            </thead>
            <tbody>
              {requests.requestLines?.map((requestLine) => (
                <tr key={requestLine.id}>
                  <td>{requestLine.product?.name}</td>
                  <td>{money(requestLine.product?.price ?? 0)}</td>
                  
                  <td>{requestLine.quantity}</td>
                
                  <td>{money((requestLine.product?.price ?? 0) * requestLine.quantity)}</td>
                  <td>
                    <Link to={`/requests/detail/${requests.id}/RequestLine/edit/${requestLine.id}`}
                      className="btn btn-outline-secondary btn-sm me-1" title="Edit">
                      <svg className="bi pe-none" width={16} height={16} fill="currentColor">
                        <use xlinkHref={`${bootstrapIcons}#pencil`} />
                      </svg>
                    </Link>
                  <button type="button" className="btn btn-outline-danger btn-sm" title="Delete"
  onClick={() => handleShowDeleteItemModal(requestLine)}>
  <svg className="bi pe-none" width={16} height={16} fill="currentColor">
    <use xlinkHref={`${bootstrapIcons}#trash`} />
  </svg>
</button>
                  </td>
                </tr>
              ))}
              {requests.requestLines?.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-muted text-center py-3">No items added yet.</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Link to={`/requests/detail/${requests.id}/requestLine/create`}
                    className="btn btn-outline-primary">
                    <svg className="bi pe-none me-1" width={16} height={16} fill="currentColor">
                      <use xlinkHref={`${bootstrapIcons}#plus`} />
                    </svg>
                    Add RequestLine
                  </Link>
                </td>
                <td /><td /><td>{money(total)}</td><td />
              </tr>
            </tfoot>
          </table>
          </div>
        )}
      <Modal show={!!requestLineToDelete} onHide={handleCloseDeleteItemModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this request?</p>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={handleCloseDeleteItemModal}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={removeRequestLine} disabled={loading}>Delete</button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showRejectModal} onHide={handleCloseRejectModal}>
        <Modal.Header closeButton>
          <Modal.Title>REJECTED Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="rejectReason" className="form-label">Rejection Reason</label>
            <textarea
              id="rejectReason"
              rows={3}
              className={`form-control ${rejectError && "is-invalid"}`}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="invalid-feedback">{rejectError}</div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={handleCloseRejectModal}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={reject}>Reject</button>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default RequestsDetailPage;