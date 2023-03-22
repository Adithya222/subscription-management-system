import {Contact} from "./contact.model";
import {Address} from "./address.model";

export interface Supplier {
  id: number,
  companyName: string,
  contactPersonName: string,
  contactPersonDesignation: string,
  email: string,
  vatNumber: string;
  productBrand: string;
  website: string;
  contactList: Contact[];
  addressList: Address[];
  supplierCreditLimit: string;
  description: string;
  isActive: boolean;
}

export var SupplierFilterFields = [
  {type: 'input', key: 'contactPersonName', title: 'Contact Person Name'},
  {type: 'input', key: 'companyName', title: 'Company Name'},
  {type: 'input', key: 'email', title: 'Email'},
]

export class SupplierFilter {
  contactPersonName: string = '';
  companyName: string = '';
  email: string = '';
  page: any = 1;
  size: any = 20;
}
