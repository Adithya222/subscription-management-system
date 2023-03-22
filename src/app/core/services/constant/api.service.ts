import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _imsApiGatewayUrl: any;
  private readonly _commonApiGatewayUrl: any;

  constructor() {
    this._imsApiGatewayUrl = environment.baseUrl + '/subscription-service';
    this._commonApiGatewayUrl = environment.baseUrl + '/common-service/api/v1';
  }

  get imsApiGatewayUrl(): any {
    return this._imsApiGatewayUrl;
  }

  get commonApiGatewayUrl(): any {
    return this._commonApiGatewayUrl;
  }
}
