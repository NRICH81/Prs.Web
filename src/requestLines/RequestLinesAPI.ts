import { IRequestLines} from "./IRequestLines";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";

const url = `${BASE_URL}/requestlines`;

export const requestLinesAPI = {
find(id: number): Promise<IRequestLines> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(requestLine: IRequestLines): Promise<IRequestLines> {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(requestLine),
        headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(requestLine: IRequestLines) {
    return fetch(`${url}/${requestLine.id}`, {
      method: "PUT",
      body: JSON.stringify(requestLine),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },


}