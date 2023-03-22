import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListAllCompaniesComponent} from "./list-all-companies/list-all-companies.component";
import {CompanyCreateComponent} from "./company-create/company-create.component";

const routes: Routes = [
  {
    path: 'company-list',
    component: ListAllCompaniesComponent,
    data: {
      title: 'Company List'
    }
  },
  {
    path: 'company-create',
    component: CompanyCreateComponent,
    data: {
      title: 'Category Create'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
