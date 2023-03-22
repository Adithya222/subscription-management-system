import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringRoutingModule } from './recurring-routing.module';
import { CreateRecurringCycleComponent } from './create-recurring-cycle/create-recurring-cycle.component';
import { ViewRecurringCycleComponent } from './view-recurring-cycle/view-recurring-cycle.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FilterModule} from "../custom-components/filter/filter.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    CreateRecurringCycleComponent,
    ViewRecurringCycleComponent
  ],
  imports: [
    CommonModule,
    RecurringRoutingModule,
    ReactiveFormsModule,
    FilterModule,
    InfiniteScrollModule,
    NgbDropdownModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class RecurringModule { }
