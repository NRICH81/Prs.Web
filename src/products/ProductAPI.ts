
import { IProduct } from "./IProduct";
import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities"

const url = `${BASE_URL}/products`;

export interface IProductPage {
  items: IProduct[];
  totalCount: number;
}

export const productAPI = {
  list(pageNumber = 1, pageSize = 12): Promise<IProductPage> {
    return fetch(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then(checkStatus)
      .then(async (response) => {
        const items = await parseJSON(response);
        const totalCount = Number(response.headers.get("X-Total-Count") ?? items.length);
        return { items, totalCount };
      });
  },
  find(id: number): Promise<IProduct> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  post(products: IProduct): Promise<IProduct> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(products ),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  put(products: IProduct): Promise<IProduct> {
    return fetch(`${url}/${products.id}`, {
      method: "PUT",
      body: JSON.stringify(products),
      headers: { "Content-Type": "application/json" },
    }).then(checkStatus).then(parseJSON);
  },
  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
};