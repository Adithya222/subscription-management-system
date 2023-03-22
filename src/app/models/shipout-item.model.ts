export interface ShipOutItem {
  id: number;
  item: number;
  unitPrice: number;
  quantity: number;
  discount: number;
  tax: number;
  amount: number;
  subTotal: number;
  deliveryAmount: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
  note: string;
  serialNo: string;
  shipOutId: number;
  isActive: boolean;
}
