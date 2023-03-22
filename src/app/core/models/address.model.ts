export interface Address {
  id?: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  supplierId: number;
  isActive: boolean;
}
