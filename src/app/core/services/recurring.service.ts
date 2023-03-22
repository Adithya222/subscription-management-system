import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Brand} from "../models/brand.model";
import {ApiRecurringService} from "./constant/api-recurring.service";

@Injectable({
  providedIn: 'root'
})
export class RecurringService {

  constructor(
    private http: HttpClient,
    private apiRecurringService: ApiRecurringService
  ) {
  }

  getAllRecurrings(filters: any){
    return this.http.post(this.apiRecurringService.getRecurrings, filters).pipe(map((data: any) => {
      return data.data.data
    }));
  }

  getAllRecurringsById(id:any){
    return this.http.get(this.apiRecurringService.getRecurringsById + id)
  }

  // getLatestInvoice(id: any) {
  //   return this.http.get(this.apiInvoiceService.getLatestInvoice + id)
  // }

  addRecurring(brand: Brand): Observable<any> {
    return this.http.post(this.apiRecurringService.createRecurring, brand);
  }

  updateRecurring(recurring:any) {
    return this.http.put(this.apiRecurringService.updateRecurring, recurring)
  }

  deleteRecurring(brand: Brand): Observable<any> {
    return this.http.put(this.apiRecurringService.deleteRecurring ,brand);
  }


}
