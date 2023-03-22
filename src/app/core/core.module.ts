import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingSpinnerComponent} from './layouts/loading-spinner/loading-spinner.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FilterModule} from "./components/custom-components/filter/filter.module";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {WebLayoutComponent} from './layouts/web-layout/web-layout.component';
import {HeaderComponent} from "./layouts/header/header.component";
import {FooterComponent} from "./layouts/footer/footer.component";
import {SidebarComponent} from "./layouts/sidebar/sidebar.component";
import {NgxPermissionsModule} from "ngx-permissions";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
    AdminLayoutComponent,
    WebLayoutComponent,
  ],
  exports: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    FilterModule,
    ConfirmDialogModule,
    ToastModule,
    NgxPermissionsModule,
  ],
})
export class CoreModule {
}
