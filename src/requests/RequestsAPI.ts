import { IRequests } from "./IRequests";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/requests`;

export const requestsAPI = {
  list(status?: string): Promise<IRequests[]> {
    const query = status ? `?status=${status}` : "";
    return fetch(`${url}${query}`).then(checkStatus).then(parseJSON);
  },
  post(request: IRequests): Promise<IRequests> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(request: IRequests): Promise<IRequests> {
    return fetch(`${url}/${request.orderNumber}`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
  find(id: number): Promise<IRequests> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  startPreparing(id: number) {
    return fetch(`${url}/${id}/startpreparing`, { method: "PUT" }).then(checkStatus);
  },
  markReady(id: number) {
    return fetch(`${url}/${id}/markready`, { method: "PUT" }).then(checkStatus);
  },
  markServed(id: number) {
    return fetch(`${url}/${id}/markserved`, { method: "PUT" }).then(checkStatus);
  },
  cancel(id: number, rejectionReason: string) {
    return fetch(`${url}/${id}/cancel`, {
      method: "PUT",
      body: JSON.stringify(rejectionReason),   // plain string, not { reason: … }
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus);
  },
};
