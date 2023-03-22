import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiBrandService} from "./constant/api-brand.service";
import {Brand} from "../models/brand.model";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient,
    private apiBrandService: ApiBrandService
  ) {
  }

  getBrands(filters: any): Observable<Brand[]> {
    return this.http.post(this.apiBrandService.getBrands, filters).pipe(map((data: any) => {
      const brands: Brand[] = [];
      for (let key in data.data.data) {
        brands.push(data.data.data[key]);
      }
      return brands
    }));
  }

  getAllBrands(filters: any): Observable<Brand[]> {
    return this.http.post(this.apiBrandService.getBrands, filters).pipe(map((data: any) => {
      return data.data.data
    }));
  }

  addBrand(brand: Brand): Observable<any> {
    return this.http.post(this.apiBrandService.createBrand, brand);
  }

  updateBrand(brand: Brand): Observable<any> {
    return this.http.put(this.apiBrandService.updateBrand, brand)
  }

  deleteBrand(brand: Brand): Observable<any> {
    return this.http.put(this.apiBrandService.deleteBrand ,brand);
  }


}
