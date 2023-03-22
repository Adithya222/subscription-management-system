import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriberRoutingModule } from './subscriber-routing.module';
import { ListAllSubscribersComponent } from './list-all-subscribers/list-all-subscribers.component';


@NgModule({
  declarations: [
    ListAllSubscribersComponent
  ],
  imports: [
    CommonModule,
    SubscriberRoutingModule
  ]
})
export class SubscriberModule { }
