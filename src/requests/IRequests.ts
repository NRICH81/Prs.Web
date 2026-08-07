import { IProducts } from "../products/IProducts";
import {IRequestLines} from "../requestLines/IRequestLines";
import { IUsers } from "../users/IUsers";

export interface IRequests {
id: number | undefined;
userId: number | undefined;
description: string | undefined;
justification: string | undefined;
rejectionReason: "" | null;
user: string | undefined;
 status: string;
deliveryMode: string | undefined;
total: number | undefined;
orderNumber: number | undefined;
requestLines?: IRequestLines[] 
firstName: IUsers | undefined;
lastName: IUsers | undefined;
vendorId: IProducts | undefined;
emptyRequest: IRequests | null;

}