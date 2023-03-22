export interface Inventory {
  id?: number;
  brand: string;
  sku: string;
  itemName: string;
  actualStockQuantity: number;
  reservedQuantity: number;
  quantity: number;
}

export var InventoryFilterFields = [
  {type: 'number', key: 'warehouseId', title: 'Warehouse'},
  {type: 'number', key: 'brand', title: 'Product Brand'},
  {type: 'number', key: 'productId', title: 'Item Name'},
]

export class InventoryFilter {
  warehouseId: string = '';
  brand: string = '';
  productId: string = '';
  page: number = 1;
  size: number = 20;
}
