import { IProduct} from "../products/IProduct";
import {IRequest} from "../requests/IRequest";

export interface IRequestLine {
id: number | undefined;
quantity: number;
description: string | undefined;
vendorId: number | undefined;
requestId: number | undefined;
product: IProduct | undefined;
requests: IRequest | undefined;

productId: number | undefined;
emptyRequestLine: IRequestLine | null;
}