import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrandListComponent} from "../brand/brand-list/brand-list.component";
import {BrandCreateComponent} from "../brand/brand-create/brand-create.component";
import {GetAllPlansComponent} from "./get-all-plans/get-all-plans.component";
import {CreatePlanComponent} from "./create-plan/create-plan.component";

const routes: Routes = [
  {
    path: 'plan-list',
    component: GetAllPlansComponent,
    data: {
      title: 'Plan List'
    }
  },
  {
    path: 'plan-create',
    component: CreatePlanComponent,
    data: {
      title: 'Plan Create'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
