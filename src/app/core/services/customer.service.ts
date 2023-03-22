import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiCustomerService} from "./constant/api-customer.service";
import {Customer} from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private apiCustomerService: ApiCustomerService,
    private http: HttpClient,
  ) { }

    getCustomers(filters: any): Observable<Customer[]> {
      return this.http.post(this.apiCustomerService.getCustomers, filters).pipe(map((data: any) => {
        const customers: Customer[] = [];
        for (let key in data.data.data) {
          customers.push(data.data.data[key]);
        }
        return customers
      }));
    }

  getUsers() {
    return this.http.get(this.apiCustomerService.getUser).pipe(map((data: any) => {
       return data
    }));
  }

  addCustomer(customer: Customer): Observable<any>{
    return this.http.post(this.apiCustomerService.createCustomer, customer);
  }

  addUser(user:any): Observable<any>{
    return this.http.post(this.apiCustomerService.createUser, user);
  }

  updateCustomer(customer: Customer): Observable<any>{
    return this.http.put(this.apiCustomerService.updateCustomer, customer)
  }

  deleteCustomer(id: number){
    return this.http.delete(this.apiCustomerService.deleteCustomer + id);
  }
}
