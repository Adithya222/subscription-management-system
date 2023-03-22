import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {

  private readonly _getAllCustomerData: string;
  private readonly _getAllUserData: string;
  private readonly _createCustomer: string;
  private readonly _createUser: string;
  private readonly _updateCustomer: string;
  private readonly _deleteCustomer: string;

  constructor(private _apiService: ApiService) {
    this._getAllCustomerData = _apiService.imsApiGatewayUrl + "/customer/search";
    this._getAllUserData = _apiService.imsApiGatewayUrl + "/user";
    this._createCustomer = _apiService.imsApiGatewayUrl + "/customer";
    this._createUser = _apiService.imsApiGatewayUrl + "/user";
    this._updateCustomer = _apiService.imsApiGatewayUrl + "/customer";
    this._deleteCustomer = _apiService.imsApiGatewayUrl + "/customer/";
  }

  get getCustomers() {
    return this._getAllCustomerData;
  }

  get getUser() {
    return this._getAllUserData;
  }

  get createCustomer() {
    return this._createCustomer;
  }
  get createUser() {
    return this._createUser;
  }

  get updateCustomer() {
    return this._createCustomer;
  }

  get deleteCustomer() {
    return this._deleteCustomer;
  }

}
