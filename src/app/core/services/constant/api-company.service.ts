import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiCompanyService {

  private readonly _getAllCompanyData: string;
  private readonly _createCompany: string;
  private readonly _updateCompany: string;
  private readonly _deleteCompany: string;

  constructor(private _apiService: ApiService) {
    this._getAllCompanyData = _apiService.imsApiGatewayUrl + "/company/search";
    this._createCompany = _apiService.imsApiGatewayUrl + "/company";
    this._updateCompany = _apiService.imsApiGatewayUrl + "/company/";
    this._deleteCompany = _apiService.imsApiGatewayUrl + "/company/";
  }

  get getCompanies() {
    return this._getAllCompanyData;
  }

  get createCompany() {
    return this._createCompany;
  }

  get updateCompany() {
    return this._updateCompany;
  }

  get deleteCompany() {
    return this._deleteCompany;
  }

}
