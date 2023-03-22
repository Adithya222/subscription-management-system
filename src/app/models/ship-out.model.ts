import {ShipOutItem} from "./shipout-item.model";
import {ShipOutAddress} from "./ship-out-address.model";

export interface ShipOut {
  id: number;
  customer: number;
  subTotal: number;
  discountTotal: number;
  deliveryAmount: number;
  taxTotal: number;
  total: number;
  note: string;
  date: string;
  reference: string;
  paymentReference: string;
  currency: string;
  fromWarehouse: number;
  shippingCarrier: number;
  status: string;
  shippingLabel: string;
  shippingReference: string;
  trackingNumber: string;
  shipOutItemList: ShipOutItem[];
  shipOutAddressList: ShipOutAddress[];
  isActive: boolean;
}

export var ShipOutFilterFields = [
  {type: 'input', key: 'contactPersonName', title: 'Contact Person Name'},
  {type: 'input', key: 'companyName', title: 'Company Name'},
  {type: 'input', key: 'vatNumber', title: 'Vat Number'},
  {type: 'input', key: 'email', title: 'Email'},
  {type: 'input', key: 'contact', title: 'Contact'},
]

export class ShipOutFilter {
  customer: string = '';
  page: number = 1;
  size: number = 20;
}
