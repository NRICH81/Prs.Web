import { IProducts} from "../products/IProducts";
import {IRequests} from "../requests/IRequests";

export interface IRequestLine {
id: number | undefined;
quantity: number;
description: string | undefined;
vendorId: number | undefined;
requestId: number | undefined;
product: IProducts | undefined;
requests: IRequests | undefined;

productId: number | undefined;
emptyRequestLine: IRequestLine | null;
}