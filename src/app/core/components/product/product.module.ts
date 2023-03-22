import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {PRODUCT_STATE_NAME} from "./state/product.selector";
import {productReducer} from "./state/product.reducer";
import {ProductEffects} from "./state/product.effects";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FilterModule} from "../custom-components/filter/filter.module";
import {NgbDateAdapter, NgbDateParserFormatter, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {BrandsEffects} from "../brand/state/brands.effects";
import {BrandModule} from "../brand/brand.module";
import {CustomerModule} from "../customer/customer.module";
import {BRAND_STATE_NAME} from "../brand/state/brands.selector";
import {brandsReducer} from "../brand/state/brands.reducer";
import { ProductViewComponent } from './product-view/product-view.component';
import { ValidProductListComponent } from './valid-product-list/valid-product-list.component';
import {InvoiceModule} from "../invoice/invoice.module";
import {CustomAdapter, CustomDateParserFormatter} from "../../adapters/datepicker-adapter";


@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductListComponent,
    ProductViewComponent,
    ValidProductListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(PRODUCT_STATE_NAME, productReducer),
    StoreModule.forFeature(BRAND_STATE_NAME, brandsReducer),
    EffectsModule.forFeature([ProductEffects, BrandsEffects]),
    ConfirmDialogModule,
    ToastModule,
    InfiniteScrollModule,
    FilterModule,
    NgbDropdownModule,
    NgSelectModule,
    BrandModule,
    CustomerModule,
    InvoiceModule,
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ProductModule { }
