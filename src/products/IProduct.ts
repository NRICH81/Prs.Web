import { IVendor } from "../vendor/IVendor";

export interface IProducts{
  vendorId: number | undefined;
  name: string;
  price: number | undefined;
  partNumber: string;
  unit: string;
  vendor: IVendor | undefined;
  id: number | undefined;
}