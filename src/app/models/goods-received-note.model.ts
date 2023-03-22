import {Product} from "../core/models/product.model";

export interface GoodsReceivedNote {
  id: number;
  purchaseOrder: string;
  reference: string;
  date: string;
  currency: string;
  total: number;
  note: string;
  supplier: string;
  warehouseId: string;
  warehouse: any;
  goodsReceivedNoteItemList: Product[];
  totalReceivingQuantity: number;
  isActive: boolean;
}


export var GoodsReceivedNoteFields = [
  {type: 'input', key: 'reference', title: 'Reference'},
  {type: 'date', key: 'date', title: 'Date'},
]

export class GoodsReceivedNoteFilter {
  reference: string = '';
  date: string = '';
  page: number = 1;
  size: number = 20;
}
