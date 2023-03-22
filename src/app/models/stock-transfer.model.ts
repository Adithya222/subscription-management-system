import {StockTransferItemModel} from "./stock-transfer-item.model";

export interface StockTransfer {
  id: number;
  transferFromWarehouse: string;
  fromWarehouse: string;
  toWarehouse: string;
  transferToWarehouse: string;
  date: string;
  trackingNumber: string;
  quantity: number;
  stockTransferItemList: StockTransferItemModel[];
  note: string;
  isActive: boolean;

}

export var StockTransferFilterFields = [
  // {type: 'input', key: 'contactPersonName', title: 'Contact Person Name'},
  // {type: 'input', key: 'companyName', title: 'Company Name'},
  // {type: 'input', key: 'vatNumber', title: 'Vat Number'},
  // {type: 'input', key: 'email', title: 'Email'},
  // {type: 'input', key: 'contact', title: 'Contact'},
]

export class StockTransferFilter {
  // customer: string = '';
  page: any = 1;
  size: any = 20;
}
