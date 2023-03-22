import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandRoutingModule} from './brand-routing.module';
import {BrandListComponent} from './brand-list/brand-list.component';
import {BrandCreateComponent} from './brand-create/brand-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {InputTextModule} from "primeng/inputtext";
import {StoreModule} from "@ngrx/store";
import {brandsReducer} from "./state/brands.reducer";
import {BRAND_STATE_NAME} from "./state/brands.selector";
import {EffectsModule} from "@ngrx/effects";
import {BrandsEffects} from "./state/brands.effects";
import {NgxSpinnerModule} from "ngx-spinner";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FilterModule} from "../custom-components/filter/filter.module";
import {ToastModule} from "primeng/toast";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        BrandListComponent,
        BrandCreateComponent
    ],
    exports: [
        BrandCreateComponent
    ],
    imports: [
        CommonModule,
        BrandRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        TableModule,
        RatingModule,
        InputTextModule,
        StoreModule.forFeature(BRAND_STATE_NAME, brandsReducer),
        EffectsModule.forFeature([BrandsEffects]),
        NgxSpinnerModule,
        InfiniteScrollModule,
        ConfirmDialogModule,
        FilterModule,
        ToastModule,
        NgbDropdownModule,
    ]
})
export class BrandModule {
}
