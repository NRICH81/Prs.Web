import { IProducts} from "../products/IProducts";
import {IRequests} from "../requests/IRequests";

export interface IRequestLines {
id: number | undefined;
quantity: number;
description: string | undefined;
vendorId: number | undefined;
productId: number | undefined;
product: IProducts | undefined;
requests: IRequests | undefined;

productsId: IProducts | undefined;
emptyRequestLines: IRequestLines | null;
}