import { IVendor } from "../vendors/IVendor";

export interface IProduct{
  vendorId: number | undefined;
  name: string;
  price: number | undefined;
  partNumber: string;
  unit: string;
  vendor: IVendor | undefined;
  id: number | undefined;
}