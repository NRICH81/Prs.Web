import {IRequestLine} from "../requestLines/IRequestLine";
import { IUser } from "../users/IUser";

export interface IRequest {
id: number | undefined;
userId: number | undefined;
description: string | undefined;
justification: string | undefined;
rejectionReason: string | null;
user: IUser | undefined;
 status: string;
deliveryMode: string | undefined;
total: number | undefined;
requestLines?: IRequestLine[]
}