export interface Product {
  id: number;
  itemName: string;
  itemCode: string;
  brandId: number;
  brandName: string;
  productImage: string;
  sellingPrice: number;
  description: string;
  isActive: boolean;
}

export var ProductFilterFields = [

  {type: 'input', key: 'name', title: 'Product Name'},
  {type: 'input', key: 'itemCode', title: 'Product Code'},
  {type: 'input', key: 'brandName', title: 'CategoryName'},

]

export class ProductFilter {
  name: string = '';
  itemCode: string = '';
  brandName: string = '';
  page: any = 1;
  size: any = 20;
}
