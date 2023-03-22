import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerCreateComponent} from "./customer-create/customer-create.component";

const routes: Routes = [
  {
    path: 'customer-list',
    component: CustomerListComponent,
    data: {
      title: 'Customer List'
    }
  },
  {
    path: 'customer-create',
    component: CustomerCreateComponent,
    data: {
      title: 'Customer Create'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
