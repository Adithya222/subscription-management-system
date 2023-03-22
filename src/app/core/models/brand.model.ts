export interface Brand {
  id: number;
  brandName: string;
  description: string;
  isActive: boolean;
}

export var BrandFilterFields = [
  {type: 'input', key: 'brandName', title: 'Category Name'}
]

export class BrandFilter {
  brandName: string = '';
  page: any = 1;
  size: any = 20;
}
