import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiInventoryService {
  private readonly _getAllInventoryData: string;
  private readonly _createInventory: string;
  private readonly _updateInventory: string;
  private readonly _deleteInventory: string;

  constructor(private _apiService: ApiService) {
    this._getAllInventoryData = _apiService.imsApiGatewayUrl + "/inventory/search";
    this._createInventory = _apiService.imsApiGatewayUrl + "/inventory";
    this._updateInventory = _apiService.imsApiGatewayUrl + "/inventory";
    this._deleteInventory = _apiService.imsApiGatewayUrl + "/inventory/";
  }

  get getInventory() {
    return this._getAllInventoryData;
  }

  get createInventory() {
    return this._createInventory;
  }

  get updateInventory() {
    return this._createInventory;
  }

  get deleteInventory() {
    return this._deleteInventory;
  }
}
