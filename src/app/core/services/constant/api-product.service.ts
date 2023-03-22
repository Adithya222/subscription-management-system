import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  private readonly _getAllProductData: string;
  private readonly _getProductsByPlanId: string;
  private readonly _createProduct: string;
  private readonly _updateProduct: string;
  private readonly _deleteProduct: string;
  private readonly _getProductById: string;

  constructor(private _apiService: ApiService) {
    this._getAllProductData = _apiService.imsApiGatewayUrl + "/product/search";
    this._getProductsByPlanId = _apiService.imsApiGatewayUrl + "/product/";
    this._createProduct = _apiService.imsApiGatewayUrl + "/product";
    this._updateProduct = _apiService.imsApiGatewayUrl + "/product/";
    this._deleteProduct = _apiService.imsApiGatewayUrl + "/product/";
    this._getProductById = _apiService.imsApiGatewayUrl + "/product/product-by-id";
  }

  get getProducts() {
    return this._getAllProductData;
  }

  get createProduct() {
    return this._createProduct;
  }

  get getProductsByPlanId() {
    return this._getProductsByPlanId;
  }

  get updateProduct() {
    return this._createProduct;
  }

  get deleteProduct() {
    return this._updateProduct;
  }

  get getProductById() {
    return this._getProductById;
  }
}
