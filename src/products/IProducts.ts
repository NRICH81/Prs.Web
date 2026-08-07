import { IVendor } from "../vendor/IVendor";

export interface IProducts{
  vendorId: number | undefined;
  name: string;
  price: number | undefined;
  categoryId: number | undefined;
  vendor: IVendor | undefined;
  id: number | undefined;
}