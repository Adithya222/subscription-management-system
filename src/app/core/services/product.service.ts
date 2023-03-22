import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ApiProductService} from "./constant/api-product.service";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private apiProductService: ApiProductService,
    private http: HttpClient,
  ) {
  }

  getProducts(filters: any): Observable<Product[]> {
    return this.http.post(this.apiProductService.getProducts, filters).pipe(map((data: any) => {
      const products: Product[] = [];
      for (let key in data.data.data) {
        products.push(data.data.data[key]);
      }
      return products
    }));
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.apiProductService.createProduct, product);
  }
  getProductsByPlanId(id:any) {
    return this.http.get(this.apiProductService.getProductsByPlanId + id);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.apiProductService.updateProduct, product)
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.put(this.apiProductService.deleteProduct,product);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(this.apiProductService.getProductById.replace('{id}', id));
  }

}
