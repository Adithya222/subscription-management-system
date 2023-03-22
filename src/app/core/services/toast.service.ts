import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {Store} from "@ngrx/store";
import {setFormLoading} from "../store/Shared/shared.actions";
import {CoreAppState} from "../store/app.state";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
      private store: Store<CoreAppState>,
      private messageService: MessageService
  ) { }

  successMsg(msg = 'Success', isMassage = false) {
    if (isMassage) {
      this.messageService.add({severity: 'success', summary: 'Success!', detail: msg});
    }
    this.store.dispatch(setFormLoading({status: false}));
  }

  errorMsg(msg = '') {
    this.store.dispatch(setFormLoading({status: false}));
    if (msg != '') {
      this.messageService.add({severity: 'error', summary: 'Error!', detail: msg});
    }
  }

}
