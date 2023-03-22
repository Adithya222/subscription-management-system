import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { ListAllCompaniesComponent } from './list-all-companies/list-all-companies.component';
import {BrandModule} from "../brand/brand.module";
import {FilterModule} from "../custom-components/filter/filter.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { CompanyCreateComponent } from './company-create/company-create.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {companyReducer} from "./state/company.reducer";
import {COMPANY_STATE_NAME} from "./state/company.selector";
import {CompanyEffects} from "./state/company.effects";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    ListAllCompaniesComponent,
    CompanyCreateComponent
  ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        BrandModule,
        FilterModule,
        InfiniteScrollModule,
        NgbDropdownModule,
        ConfirmDialogModule,
        ToastModule,
        StoreModule.forFeature(COMPANY_STATE_NAME, companyReducer),
        EffectsModule.forFeature([CompanyEffects]),
        ReactiveFormsModule,
        NgSelectModule,
    ]
})
export class CompanyModule { }
