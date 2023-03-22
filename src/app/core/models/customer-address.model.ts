export interface CustomerAddressList {
  id?: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  customerId: number;
  isActive: boolean;
}
