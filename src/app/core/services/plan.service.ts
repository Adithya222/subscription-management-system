import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Brand} from "../models/brand.model";
import {ApiPlanService} from "./constant/api-plan.service";
import {Plan} from "../models/plan.model";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private http: HttpClient,
    private apiPlanService: ApiPlanService
  ) {
  }

  getPlans(filters: any): Observable<Plan[]> {
    return this.http.post(this.apiPlanService.getPlans, filters).pipe(map((data: any) => {
      const plans: Plan[] = [];
      for (let key in data.data.data) {
        plans.push(data.data.data[key]);
      }
      return plans
    }));
  }

  getPlanById(id:any) {
    return this.http.get(this.apiPlanService.getPlanById + id);
  }

  getPlanPublic() {
    return this.http.get(this.apiPlanService.getPlans).pipe(map((data: any) => {
      return data
    }));
  }



  getAllPlans(filters: any): Observable<Plan[]> {
    return this.http.post(this.apiPlanService.getPlans, filters).pipe(map((data: any) => {
      return data.data.data
    }));
  }

  addPlan(plan: Plan): Observable<any> {
    return this.http.post(this.apiPlanService.createPlan, plan);
  }

  updatePlan(plan: Plan): Observable<any> {
    return this.http.put(this.apiPlanService.updatePlan, plan)
  }

  deletePlan(plan: Plan): Observable<any> {
    return this.http.put(this.apiPlanService.deletePlan ,plan);
  }


}
