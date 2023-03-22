import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Plan} from "../models/plan.model";
import {ApiInvoiceService} from "./constant/api-invoice.service";
import {Invoice} from "../models/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient,
    private apiInvoiceService: ApiInvoiceService
  ) {
  }

  getInvoices(filters: any): Observable<Plan[]> {
    return this.http.post(this.apiInvoiceService.getInvoice, filters).pipe(map((data: any) => {
      const plans: Plan[] = [];
      for (let key in data.data.data[0]) {
        plans.push(data.data.data[key]);
      }
      return plans
    }));
  }

  getInvoice(filters: any) {
    return this.http.post(this.apiInvoiceService.getInvoice, filters)
  }

  getLatestInvoice(id: any) {
    return this.http.get(this.apiInvoiceService.getLatestInvoice + id)
  }

  getInvoiceById(id:any) {
    return this.http.get(this.apiInvoiceService.getInvoiceById + id);
  }


  getAllInvoices(filters: any): Observable<Plan[]> {
    return this.http.post(this.apiInvoiceService.getInvoice, filters).pipe(map((data: any) => {
      return data.data.data
    }));
  }

  // addInvoice(plan: Plan): Observable<any> {
  //   return this.http.post(this.apiInvoiceService.createInvoice, plan);
  // }

  addInvoice(invoice : any){
    return this.http.post(this.apiInvoiceService.createInvoice, invoice);
  }

  updateInvoice(invoice: Invoice): Observable<any> {
    return this.http.put(this.apiInvoiceService.updateInvoice, invoice)
  }

  updateInvoiceStatus(invoice: any) {
    return this.http.put(this.apiInvoiceService.updateInvoice, invoice)
  }

  deleteInvoice(plan: Plan): Observable<any> {
    return this.http.put(this.apiInvoiceService.deleteInvoice ,plan);
  }


}
