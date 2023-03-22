import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrandListComponent} from "../brand/brand-list/brand-list.component";
import {BrandCreateComponent} from "../brand/brand-create/brand-create.component";
import {ViewRecurringCycleComponent} from "./view-recurring-cycle/view-recurring-cycle.component";
import {CreateRecurringCycleComponent} from "./create-recurring-cycle/create-recurring-cycle.component";

const routes: Routes = [
  {
    path: 'recurring-list',
    component: ViewRecurringCycleComponent,
    data: {
      title: 'Recurring List'
    }
  },
  {
    path: 'recurring-create',
    component: CreateRecurringCycleComponent,
    data: {
      title: 'Recurring Create'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringRoutingModule { }
