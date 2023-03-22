export interface Invoice {
  id?: number;
  currency: string;
  invoiceNo: string;
  recurring: string;
  date: string;
  dueDate: string;
  recurringCycle: string;
  planId: string;
  subscriberId: string;
  total: string;
  isActive: boolean;

}
//
// export var InventoryFilterFields = [
//   {type: 'number', key: 'warehouseId', title: 'Warehouse'},
//   {type: 'number', key: 'brand', title: 'Product Brand'},
//   {type: 'number', key: 'productId', title: 'Item Name'},
// ]

export class InvoiceFilter {
  // warehouseId: string = '';
  id: string = '';
  subscriberId: string = '';
  page: number = 1;
  size: number = 20;
}
