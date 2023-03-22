import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanRoutingModule} from './plan-routing.module';
import {CreatePlanComponent} from './create-plan/create-plan.component';
import {GetAllPlansComponent} from './get-all-plans/get-all-plans.component';
import {FilterModule} from "../custom-components/filter/filter.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {PLAN_STATE_NAME} from "./state/plan.selector";
import {planReducer} from "./state/plan.reducer";
import {EffectsModule} from "@ngrx/effects";
import {PlanEffects} from "./state/plan.effects";
import {NgSelectModule} from "@ng-select/ng-select";
import {PRODUCT_STATE_NAME} from "../product/state/product.selector";
import {productReducer} from "../product/state/product.reducer";
import {ProductEffects} from "../product/state/product.effects";


@NgModule({
  declarations: [
    CreatePlanComponent,
    GetAllPlansComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    FilterModule,
    InfiniteScrollModule,
    ConfirmDialogModule,
    ToastModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    StoreModule.forFeature(PLAN_STATE_NAME, planReducer),
    StoreModule.forFeature(PRODUCT_STATE_NAME, productReducer),
    EffectsModule.forFeature([PlanEffects, ProductEffects]),
    NgSelectModule,


  ]
})
export class PlanModule {
}
