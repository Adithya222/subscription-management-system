import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiBrandService {

  private readonly _getAllBrandData: string;
  private readonly _createBrand: string;
  private readonly _updateBrand: string;
  private readonly _deleteBrand: string;

  constructor(private _apiService: ApiService) {
    this._getAllBrandData = _apiService.imsApiGatewayUrl + "/product-brand/search";
    this._createBrand = _apiService.imsApiGatewayUrl + "/product-brand";
    this._updateBrand = _apiService.imsApiGatewayUrl + "/product-brand/";
    this._deleteBrand = _apiService.imsApiGatewayUrl + "/product-brand/";
  }

  get getBrands() {
    return this._getAllBrandData;
  }

  get createBrand() {
    return this._createBrand;
  }

  get updateBrand() {
    return this._updateBrand;
  }

  get deleteBrand() {
    return this._updateBrand;
  }

}
