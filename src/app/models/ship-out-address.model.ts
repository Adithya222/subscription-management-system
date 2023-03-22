export interface ShipOutAddress {
  id: number;
  addressType: string;
  customerName: string;
  customerEmail: string;
  mobileNo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shipOutId: number;
  customer: number;
  isActive: boolean;
}
