import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterDataComponent} from "./filter-data/filter-data.component";
import {NgbPopoverModule} from "@ng-bootstrap/ng-bootstrap";
import {InputComponent} from './input/input.component';
import {DateComponent} from './date/date.component';
import {TimeComponent} from './time/time.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { DateRangeComponent } from './date-range/date-range.component';
import { TimeRangeComponent } from './time-range/time-range.component';

@NgModule({
    declarations: [
        FilterDataComponent,
        InputComponent,
        DateComponent,
        TimeComponent,
        DateRangeComponent,
        TimeRangeComponent,
    ],
    exports: [
        FilterDataComponent
    ],
    imports: [
        CommonModule,
        NgbPopoverModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ]
})
export class FilterModule {
}
