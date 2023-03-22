export interface PurchaseOrderAddress {
  id: number;
  country: string;
  postcode: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  contactPersonName: string;
  phone: string;
  email: string;
  purchaseOrderId: number;
  isActive: boolean;
}
