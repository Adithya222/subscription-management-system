import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', canActivate: [], loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'customer', canActivate: [], loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule)},
  { path: 'brand', canActivate: [], loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule)},
  { path: 'product', canActivate: [], loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)},
  { path: 'plan', canActivate: [], loadChildren: () => import('./components/plan/plan.module').then(m => m.PlanModule)},
  { path: 'company', canActivate: [], loadChildren: () => import('./components/company/company.module').then(m => m.CompanyModule)},
  { path: 'invoice', canActivate: [], loadChildren: () => import('./components/invoice/invoice.module').then(m => m.InvoiceModule)},
  { path: 'recurring', canActivate: [], loadChildren: () => import('./components/recurring/recurring.module').then(m => m.RecurringModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
