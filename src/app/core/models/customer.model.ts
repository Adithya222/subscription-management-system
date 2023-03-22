import {CustomerContactList} from "./customer-contact.model";
import {CustomerAddressList} from "./customer-address.model";

export interface Customer{
  id: number,
  customerName: string,
  email: string,
  contactList: CustomerContactList[];
  addressList: CustomerAddressList[];
  description: string;
  isActive: boolean;
}

export var CustomerFilterFields = [
    // {type: 'input', key: 'customerName', title: 'Customer Name'},
    // {type: 'input', key: 'email', title: 'Email'}
]

export class CustomerFilter {
    // name: string = '';
    // email: string = '';
    page: any = 1;
    size: any = 20;
}
