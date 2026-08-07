
import { IProducts } from "./IProducts";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities"

const url = `${BASE_URL}/Products`;

export const productsAPI = {
  list(): Promise<IProducts[]> {
    return fetch(url).then(checkStatus).then(parseJSON);
  },
  find(id: number): Promise<IProducts> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(products: IProducts): Promise<IProducts> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(products ),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(Products: IProducts): Promise<IProducts> {
    return fetch(`${url}/${Products.vendorId}`, {
      method: "PUT",
      body: JSON.stringify(Products),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
};