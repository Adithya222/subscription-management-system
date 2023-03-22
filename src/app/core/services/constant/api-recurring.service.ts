import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiRecurringService {

  private readonly _getAllRecurringData: string;
  private readonly _getRecurringsById: string;
  private readonly _createRecurring: string;
  private readonly _updateRecurring: string;
  private readonly _deleteRecurring: string;

  constructor(private _apiService: ApiService) {
    this._getAllRecurringData = _apiService.imsApiGatewayUrl + "/recurring-cycle/search";
    this._getRecurringsById = _apiService.imsApiGatewayUrl + "/recurring-cycle/";
    this._createRecurring = _apiService.imsApiGatewayUrl + "/recurring-cycle";
    this._updateRecurring = _apiService.imsApiGatewayUrl + "/recurring-cycle/";
    this._deleteRecurring = _apiService.imsApiGatewayUrl + "/recurring-cycle/";
  }

  get getRecurrings() {
    return this._getAllRecurringData;
  }

  get getRecurringsById() {
    return this._getRecurringsById;
  }

  get createRecurring() {
    return this._createRecurring;
  }

  get updateRecurring() {
    return this._updateRecurring;
  }

  get deleteRecurring() {
    return this._updateRecurring;
  }

}
