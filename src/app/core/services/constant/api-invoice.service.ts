import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiInvoiceService {

  private readonly _getAllInvoiceData: string;
  private readonly _getInvoiceById: string;
  private readonly _getLatestInvoiceById: string;
  private readonly _createInvoice: string;
  private readonly _updateInvoice: string;
  private readonly _deleteInvoice: string;

  constructor(private _apiService: ApiService) {
    this._getAllInvoiceData = _apiService.imsApiGatewayUrl + "/invoice/search";
    this._getInvoiceById = _apiService.imsApiGatewayUrl + "/invoice/";
    this._getLatestInvoiceById = _apiService.imsApiGatewayUrl + "/invoice/subscriber/";
    this._createInvoice = _apiService.imsApiGatewayUrl + "/invoice/";
    this._updateInvoice = _apiService.imsApiGatewayUrl + "/invoice/";
    this._deleteInvoice = _apiService.imsApiGatewayUrl + "/invoice/";
  }

  get getInvoice() {
    return this._getAllInvoiceData;
  }
  get getLatestInvoice() {
    return this._getLatestInvoiceById;
  }

  get getInvoiceById() {
    return this._getInvoiceById;
  }

  get createInvoice() {
    return this._createInvoice;
  }

  get updateInvoice() {
    return this._updateInvoice;
  }

  get deleteInvoice() {
    return this._updateInvoice;
  }

}
