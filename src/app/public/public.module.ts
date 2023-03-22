import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { SubscribePlanComponent } from './subscribe-plan/subscribe-plan.component';
import {InputSwitchModule} from "primeng/inputswitch";
import {NgSelectModule} from "@ng-select/ng-select";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SubscribePlanComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    InputSwitchModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
