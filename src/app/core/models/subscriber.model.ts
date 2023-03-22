export interface Brand {
  id: number;
  subscriberNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: number;
  website: number;
  isActive: boolean;
}

export var BrandFilterFields = [
  {type: 'input', key: 'brandName', title: 'Brand Name'}
]

export class BrandFilter {
  brandName: string = '';
  page: any = 1;
  size: any = 20;
}
