import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ApiInventoryService} from "./constant/api-inventory.service";
import {Inventory} from "../models/inventory.model";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(
    private apiInventoryService: ApiInventoryService,
    private http: HttpClient,
  ) { }

  getInventory(filters: any): Observable<Inventory[]> {
    return this.http.post(this.apiInventoryService.getInventory, filters).pipe(map((data: any) => {
      const inventories: Inventory[] = [];
      for (let key in data.data.data) {
        inventories.push(data.data.data[key]);
      }
      return inventories
    }));
  }

  addInventory(inventory: Inventory): Observable<any>{
    return this.http.post(this.apiInventoryService.createInventory, inventory);
  }

  updateInventory(inventory: Inventory): Observable<any>{
    return this.http.put(this.apiInventoryService.updateInventory, inventory)
  }

  deleteInventory(id: number){
    return this.http.delete(this.apiInventoryService.deleteInventory + id);
  }
}
