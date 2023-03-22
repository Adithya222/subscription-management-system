import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductCreateComponent} from "./product-create/product-create.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductViewComponent} from "./product-view/product-view.component";
import {ValidProductListComponent} from "./valid-product-list/valid-product-list.component";

const routes: Routes = [
  {
    path: 'product-create',
    component: ProductCreateComponent,
    data: {
      title: 'Product Create'
    }
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    data: {
      title: 'Product List'
    }
  },
  {
    path: 'valid-product-list',
    component: ValidProductListComponent,
    data: {
      title: 'Product List'
    }
  },
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
    data: {
      title: 'Product List'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
