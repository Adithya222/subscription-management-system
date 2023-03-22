import {Address} from "./address.model";
import {Contact} from "./contact.model";

export interface Company {
  id: number;
  companyName: string;
  companyRegistrationNumber: string;
  email: string;
  contactList: Contact[];
  addressList: Address[];
  isActive: boolean;
}

export var CompanyFilterFields = [
  {type: 'input', key: 'brandName', title: 'Brand Name'}
]

export class CompanyFilter {
  // brandName: string = '';
  page: any = 1;
  size: any = 20;
}
