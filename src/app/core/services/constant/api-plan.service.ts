import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ApiPlanService {

  private readonly _getAllPlanData: string;
  private readonly _getPlanById: string;
  private readonly _createPlan: string;
  private readonly _updatePlan: string;
  private readonly _deletePlan: string;

  constructor(private _apiService: ApiService) {
    this._getAllPlanData = _apiService.imsApiGatewayUrl + "/plan/search";
    this._getPlanById = _apiService.imsApiGatewayUrl + "/plan/";
    this._createPlan = _apiService.imsApiGatewayUrl + "/plan";
    this._updatePlan = _apiService.imsApiGatewayUrl + "/plan/";
    this._deletePlan = _apiService.imsApiGatewayUrl + "/plan/";
  }

  get getPlans() {
    return this._getAllPlanData;
  }

  get getPlanById() {
    return this._getPlanById;
  }

  get createPlan() {
    return this._createPlan;
  }

  get updatePlan() {
    return this._updatePlan;
  }

  get deletePlan() {
    return this._updatePlan;
  }

}
