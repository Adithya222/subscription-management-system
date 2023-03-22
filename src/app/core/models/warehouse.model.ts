export interface Warehouse {
  id: number;
  warehouseName: string;
  type: string;
  locationName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export var WarehouseFilterFields = [
  // {type: 'input', key: 'warehouseName', title: 'Warehouse Name'},
  // {type: 'input', key: 'type', title: 'Type'},
  // {type: 'input', key: 'locationName', title: 'Location Name'},
]

export class WarehouseFilter {
  // warehouseName: string = '';
  // type: string = '';
  // locationName: string = '';
  page: any = 1;
  size: any = 20;
}
