import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { IRequests } from "./IRequests";
import { IRequestLine } from "../requestLines/IRequestLine";
import { requestsAPI } from "./RequestsAPI";
import { requestLineAPI } from "../requestLines/RequestLineAPI";
import RequestsHeader from "./RequestsHeader";
import { money } from "../utility/formatUtilities";
import { useUserContext } from "../UserContext";

interface ICancelForm {
  rejectionReason: string;
}

function RequestsDetailPage() {
  const { user: user } = useUserContext();       // the signed-in user
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<IRequests | undefined>(undefined);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);
   const isOwnRequest = request?.userId === user?.id;
   const canCancel = isOwnRequest || user?.isAdmin;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICancelForm>({
    defaultValues: { rejectionReason: "" },
  });

  const loadRequest = useCallback(async () => {
    // Defer the loading flag update so effect-triggered fetches don't synchronously set state.
    await Promise.resolve();
    setLoading(true);
    try {
      setRequest(await requestsAPI.find(Number(id)));
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [id]);

  async function markNew() {
    if (!request?.id) return;
    setLoading(true);
    try {
      await requestsAPI.markNew(request.id);
      toast.success("Request marked New.");
      await loadRequest();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function markReview() {
    if (!request?.id) return;
    setLoading(true);
    try {
      await requestsAPI.markReview(request.id);
      toast.success("Request marked Review.");
      await loadRequest();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function markApproved() {
    if (!request?.id) return;
    setLoading(true);
    try {
      await requestsAPI.markApproved(request.id);
      toast.success("Request marked Approved.");
      await loadRequest();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  function openRejection() {
    setIsRejectionOpen(true);
  }

  function closeRejection() {
    setIsRejectionOpen(false);
    reset({ rejectionReason: "" });
  }

  const saveCancel: SubmitHandler<ICancelForm> = async (formValues) => {
    if (!request?.id) return;
    setLoading(true);
    try {
      await requestsAPI.cancel(request.id, formValues.rejectionReason);
      toast.success("Request cancelled.");
      closeRejection();
      await loadRequest();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const [requestLineToDelete, setRequestLineToDelete] = useState<IRequestLine | undefined>(undefined);

  function handleShowDeleteItemModal(requestLine: IRequestLine) { setRequestLineToDelete(requestLine); }
  function handleCloseDeleteItemModal() { setRequestLineToDelete(undefined); }

  async function removeRequestLine() {
    if (!requestLineToDelete?.id) return;
    setLoading(true);
    try {
      await requestLineAPI.delete(requestLineToDelete.id);
      setRequestLineToDelete(undefined);
      toast.success("Successfully deleted.");
      await loadRequest();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void loadRequest();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadRequest     ]);

  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <Modal show={isRejectionOpen} onHide={closeRejection}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(saveCancel)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="rejectionReason">Rejection Reason</label>
              <textarea
                {...register("rejectionReason", { required: "Rejection reason is required" })}
                className={`form-control ${errors?.rejectionReason && "is-invalid"}`}
                id="rejectionReason"
                rows={6}
              ></textarea>
              <div className="invalid-feedback">{errors?.rejectionReason?.message}</div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-primary" onClick={closeRejection}>Close</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>Confirm Cancel</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-between pb-4 mb-4 border-bottom border-2">
        <h2>Request </h2>
        <div className="d-flex justify-content-end gap-2">
          {request?.id && (
            <Link to={`/requests/edit/${request.id}`} className="btn btn-outline-primary">Edit</Link>
          )}
          {request?.status === "NEW" && (
            <button className="btn btn-primary" onClick={markReview}>Mark Review</button>
          )}
          {request?.status === "REVIEW" && (
            <button className="btn btn-primary" onClick={markApproved}>Mark Approved</button>
          )}
          {request?.status === "REJECTED" && (
            <button className="btn btn-primary" onClick={markNew}>Mark New</button>
          )}
          {request?.status !== "REJECTED" && (
            <button className="btn btn-outline-danger" onClick={openRejection}  disabled={!canCancel}>Cancel Request</button>
          )}
        </div>
      </div>
      {loading && <p>Loading…</p>}
      {request && <RequestsHeader request={request} />}
      {request && (
        <div className="card p-4 mt-5">
          <h5 className="card-title">Requests</h5>
          <table className="table w-75">
            <thead>
              <tr>
                <th>Products</th><th>Price</th><th>Quantity</th><th>Notes</th><th>Amount</th><th />
              </tr>
            </thead>
            <tbody>
              {request.requestLine?.map((requestLine) => (
                <tr key={requestLine.id}>
                  <td>{requestLine.product?.name}</td>
                  <td>{money(requestLine.product?.price ?? 0)}</td>
                  <td>{requestLine.quantity}</td>
                  <td className="text-body-secondary small">{requestLine.description || "—"}</td>
                  <td>{money((requestLine.product?.price ?? 0) * requestLine.quantity)}</td>
                  <td>
                    <Link to={`/requests/detail/${request.id}/RequestLine/edit/${requestLine.id}`}
                      className="btn btn-outline-secondary btn-sm me-1">Edit</Link>
                    <button type="button" className="btn btn-outline-danger btn-sm"
                      onClick={() => handleShowDeleteItemModal(requestLine)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Link to={`/requests/detail/${request.id}/RequestLine/Create`}
                    className="btn btn-outline-primary">Add RequestLine</Link>
                </td>
                <td /><td /><td /><td>{money(request.total ?? 0)}</td><td />
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
    </section>
  );
}

export default RequestsDetailPage;