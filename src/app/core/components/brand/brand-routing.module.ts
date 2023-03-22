import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrandListComponent} from "./brand-list/brand-list.component";
import {BrandCreateComponent} from "./brand-create/brand-create.component";

const routes: Routes = [
  {
    path: 'brand-list',
    component: BrandListComponent,
    data: {
      title: 'Category List'
    }
  },
  {
    path: 'brand-create',
    component: BrandCreateComponent,
    data: {
      title: 'Category Create'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
