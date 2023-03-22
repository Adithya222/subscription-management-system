import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {CUSTOMER_STATE_NAME} from "./state/customer.selector";
import {CustomerEffects} from "./state/customer.effects";
import {NgSelectModule} from "@ng-select/ng-select";
import {InputSwitchModule} from "primeng/inputswitch";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {FilterModule} from "../custom-components/filter/filter.module";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {customersReducer} from "./state/customer.reducer";


@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerCreateComponent,
    ],
    exports: [
        CustomerCreateComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule,
        InfiniteScrollModule,
        StoreModule.forFeature(CUSTOMER_STATE_NAME, customersReducer),
        EffectsModule.forFeature([CustomerEffects]),
        NgSelectModule,
        InputSwitchModule,
        ConfirmDialogModule,
        ToastModule,
        FilterModule,
        NgbDropdownModule,
    ]
})
export class CustomerModule { }
