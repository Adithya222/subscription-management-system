import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KeycloakGuard} from "./core/services/auth/keycloak-guard.service";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {WebLayoutComponent} from "./core/layouts/web-layout/web-layout.component";
import {AdminLayoutComponent} from "./core/layouts/admin-layout/admin-layout.component";

const routes: Routes = [
  {
    path: 'public', component: WebLayoutComponent, children: [
      {path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
    ]
  },
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', component: DashboardComponent},
      {path: '', canActivate: [], loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
    ], canActivate: [KeycloakGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
