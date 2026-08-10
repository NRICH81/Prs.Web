import { IRequests } from "./IRequests";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/requests`;

export const requestsAPI = {
  list(status?: string): Promise<IRequests[]> {
    const query = status ? `?status=${status}` : "";
    return fetch(`${url}${query}`).then(checkStatus).then(parseJSON);
  },
  post(requests: IRequests): Promise<IRequests> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(requests),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(requests: IRequests): Promise<IRequests> {
   return fetch(`${url}/${requests.id}`, {
      method: "PUT",
      body: JSON.stringify(requests),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
  find(id: number): Promise<IRequests> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
markNew(id: number) {
  return fetch(`${url}/${id}/marknew`, { method: "PUT" }).then(checkStatus);
},
  markReview(id: number) {
    return fetch(`${url}/${id}/markreview`, { method: "PUT" }).then(checkStatus);
  },
  markApproved(id: number) {
    return fetch(`${url}/${id}/markApproved`, { method: "PUT" }).then(checkStatus);
  },
  cancel(id: number, rejectionReason: string) {
    return fetch(`${url}/${id}/cancel`, {
      method: "PUT",
      body: JSON.stringify({ rejectionReason }),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus);
  },
};
