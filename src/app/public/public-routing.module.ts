import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubscribePlanComponent} from "./subscribe-plan/subscribe-plan.component";

const routes: Routes = [
  {
    path: 'subscribe-plan',
    component: SubscribePlanComponent,
    data: {
      title: ''
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
