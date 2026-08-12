import { IRequest } from "./IRequest";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/requests`;

export const requestAPI = {
  list(status?: string, sortBy?: string, sortDir?: string): Promise<IRequest[]> {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortDir) params.set("sortDir", sortDir);
    const query = params.toString() ? `?${params.toString()}` : "";
    return fetch(`${url}${query}`).then(checkStatus).then(parseJSON);
  },
  post(requests: IRequest): Promise<IRequest> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(requests),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(requests: IRequest): Promise<IRequest> {
   return fetch(`${url}/${requests.id}`, {
      method: "PUT",
      body: JSON.stringify(requests),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
  find(id: number): Promise<IRequest> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);

},
  review(id: number): Promise<IRequest> {
    return fetch(`${url}/${id}/review`, { method: "PUT" }).then(checkStatus).then(parseJSON);
  },
  approve(id: number): Promise<IRequest> {
    return fetch(`${url}/${id}/approve`, { method: "PUT" }).then(checkStatus).then(parseJSON);
  },
  reject(id: number, rejectionReason: string): Promise<IRequest> {
    
    return fetch(`${url}/${id}/reject`, {
      method: "PUT",
      body: JSON.stringify(rejectionReason),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
};
