import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getFilterOptions} from "../components/custom-components/filter/state/filter.selector";
import {CoreAppState} from "../store/app.state";
import {setModal2Status, setModalStatus} from "../store/Shared/shared.actions";
import {getModal, getModal2} from "../store/Shared/shared.selector";
import {AddNewItem} from "../models/add-new-item.model";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  toggleModal = new BehaviorSubject<any>('');
  filters: any = {}
  isShowModal: Observable<boolean> | undefined;
  isShowModal2: Observable<AddNewItem> | undefined;

  constructor(
      private store: Store<CoreAppState>,
  ) {
    this.isShowModal = this.store.select(getModal);
    this.isShowModal2 = this.store.select(getModal2);
  }

  currentModalStatus(message: string) {
    this.toggleModal.next(message);
  }

  getCurrentModalStatus(): BehaviorSubject<any> {
    return this.toggleModal;
  }

  getFilterOptionsAsObject(){
    this.store.select(getFilterOptions).subscribe((data) => {
      this.filters = Object.assign({}, data);
    })
    return this.filters;
  }

}
