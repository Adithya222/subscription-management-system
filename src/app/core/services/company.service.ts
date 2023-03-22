import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Brand} from "../models/brand.model";
import {ApiCompanyService} from "./constant/api-company.service";
import {Company} from "../models/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
    private apiCompanyService: ApiCompanyService
  ) {
  }

  getCompanies(filters: any): Observable<Company[]> {
    return this.http.post(this.apiCompanyService.getCompanies, filters).pipe(map((data: any) => {
      const companies: Company[] = [];
      for (let key in data.data.data) {
        companies.push(data.data.data[key]);
      }
      return companies
    }));
  }

  getAllCompanies(filters: any): Observable<Company[]> {
    return this.http.post(this.apiCompanyService.getCompanies, filters).pipe(map((data: any) => {
      return data.data.data
    }));
  }

  addCompany(company: Company): Observable<any> {
    return this.http.post(this.apiCompanyService.createCompany, company);
  }

  updateCompany(company: Company): Observable<any> {
    return this.http.put(this.apiCompanyService.updateCompany, company)
  }

  deleteCompany(company: Company): Observable<any> {
    return this.http.put(this.apiCompanyService.deleteCompany ,company);
  }

}
