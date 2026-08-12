import {IRequestLine} from "../requestLine/IRequestLine";
import { IUsers } from "../users/IUsers";

export interface IRequests {
id: number | undefined;
userId: number | undefined;
description: string | undefined;
justification: string | undefined;
rejectionReason: string | null;
user: IUsers | undefined;
 status: string;
deliveryMode: string | undefined;
total: number | undefined;
requestLines?: IRequestLine[]
}