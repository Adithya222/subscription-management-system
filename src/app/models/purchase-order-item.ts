export interface PurchaseOrderItem {
  id: number;
  unitPrice: number;
  description: string;
  unitOfMeasure: string;
  quantity: number;
  vat: number;
  amount: number;
  item: number;
  purchaseOrderId: number;
  isActive: boolean;
}
