import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateInvoiceComponent} from "./create-invoice/create-invoice.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {ViewInvoiceComponent} from "./view-invoice/view-invoice.component";

const routes: Routes = [
  {
    path: 'invoice-create',
    component: CreateInvoiceComponent,
    data: {
      title: 'Invoice Create'
    }
  },

  {
    path: 'invoice-list',
    component: InvoiceListComponent,
    data: {
      title: 'Invoice List'
    }
  },

  {
    path: 'invoice-view',
    component: ViewInvoiceComponent,
    data: {
      title: 'Invoice View'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {
}
