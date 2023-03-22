import {PurchaseOrderAddress} from "./purchase-order-address.model";
import {PurchaseOrderItem} from "./purchase-order-item";

export interface PurchaseOrder {
  id: number;
  note: string;
  total: number;
  vat: number;
  totalAmount: number;
  currency: string;
  daysOfValidity: number;
  date: string;
  reference: string;
  supplier: number;
  supplierName: string;
  warehouse: number;
  amount: number;
  isActive: boolean;
  status: string;
  shippingAddress: PurchaseOrderAddress;
  purchaseOrderItems: PurchaseOrderItem;
}

export var PurchaseOrderFilterFields = [
  {type: 'input', key: 'contactPersonName', title: 'Contact Person Name'},
  {type: 'input', key: 'companyName', title: 'Company Name'},
  {type: 'input', key: 'vatNumber', title: 'Vat Number'},
  {type: 'input', key: 'email', title: 'Email'},
  {type: 'input', key: 'contact', title: 'Contact'},
]

export class PurchaseOrderFilter {
  customer: string = '';
  page: number = 1;
  size: number = 20;
}
