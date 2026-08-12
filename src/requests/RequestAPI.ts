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
  review(id: number): Promise<IRequests> {
    return fetch(`${url}/${id}/review`, { method: "PUT" }).then(checkStatus).then(parseJSON);
  },
  approve(id: number): Promise<IRequests> {
    return fetch(`${url}/${id}/approve`, { method: "PUT" }).then(checkStatus).then(parseJSON);
  },
  reject(id: number, rejectionReason: string): Promise<IRequests> {
    
    return fetch(`${url}/${id}/reject`, {
      method: "PUT",
      body: JSON.stringify(rejectionReason),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
};
