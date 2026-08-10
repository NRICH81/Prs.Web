import { IProducts} from "../products/IProducts";
import {IRequests} from "../requests/IRequests";

export interface IRequestLine {
id: number | undefined;
quantity: number;
description: string | undefined;
vendorId: number | undefined;
requestsId: number | undefined;
product: IProducts | undefined;
requests: IRequests | undefined;

productsId: number | undefined;
emptyRequestLine: IRequestLine | null;
}