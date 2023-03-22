import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdownModule
} from "@ng-bootstrap/ng-bootstrap";
import {CustomAdapter, CustomDateParserFormatter} from "../../adapters/datepicker-adapter";
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import {FilterModule} from "../custom-components/filter/filter.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';


@NgModule({
    declarations: [
        CreateInvoiceComponent,
        InvoiceListComponent,
        ViewInvoiceComponent
    ],
    imports: [
        CommonModule,
        InvoiceRoutingModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgbDatepickerModule,
        FilterModule,
        InfiniteScrollModule,
        ConfirmDialogModule,
        ToastModule,
        NgbDropdownModule,
        FormsModule
    ],
    exports: [
        CreateInvoiceComponent
    ],
    providers: [
        {provide: NgbDateAdapter, useClass: CustomAdapter},
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ]
})
export class InvoiceModule { }
