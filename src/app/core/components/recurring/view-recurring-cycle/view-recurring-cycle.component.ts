import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {BrandFilter, BrandFilterFields} from "../../../models/brand.model";
import {emptyProductsArray} from "../../product/state/product.actions";
import {RecurringFilter, RecurringFilterFields} from "../../../models/recurring.model";
import {HelperService} from "../../../services/helper.service";
import {getLoading, getModal} from "../../../store/Shared/shared.selector";
import {setFilterOptions, setFilterOptionsFields} from "../../custom-components/filter/state/filter.actions";
import {emptyBrandsArray, updateBrand} from "../../brand/state/brands.actions";
import {RecurringService} from "../../../services/recurring.service";
import {flyInRight} from "../../../helpers/animations";
import {ConfirmationService} from "primeng/api";
import {merge} from "lodash";
import {DeleteConfirmConfig} from "../../../helpers/common-arrays";

@Component({
  selector: 'app-view-recurring-cycle',
  templateUrl: './view-recurring-cycle.component.html',
  styleUrls: ['./view-recurring-cycle.component.css'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class ViewRecurringCycleComponent implements OnInit {

  isShowModal: Observable<boolean> | undefined;
  selectedRecurringId: any = null;
  filters: RecurringFilter = new RecurringFilter();
  showLoading: Observable<boolean> | undefined;
  filterFields = RecurringFilterFields;
  recurringList: any
  deleteConfirmConfig = DeleteConfirmConfig;


  constructor(
    private store: Store<CoreAppState>,
    private helperService: HelperService,
    private recurringService: RecurringService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isShowModal = this.store.select(getModal);
    this.store.dispatch(setFilterOptions({filters: this.filters}));
    this.store.dispatch(setFilterOptionsFields({filterOptionsFields: this.filterFields}));
    this.store.dispatch(emptyBrandsArray({filters: this.filters}));
    this.getRecurrings();
  }

  getRecurrings() {
    this.recurringService.getAllRecurrings(this.filters).subscribe((response: any) => {
      this.recurringList = response
    })
  }

  showModal() {
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }

  setFilteredData(event: any) {
    if (event == 'reset') {
      this.filters = new BrandFilter();
    } else {
      this.filters = this.helperService.getFilterOptionsAsObject();
      this.filters.page = 1;
    }
    this.store.dispatch(emptyProductsArray({filters: this.filters}));
    this.getRecurrings()
  }

  onScroll() {
    this.filters = this.helperService.getFilterOptionsAsObject();
    this.filters.page++;
    this.getRecurrings();
  }

  editRecurring(id: any) {
    this.selectedRecurringId = id;
    this.store.dispatch(setModalStatus({status: true}));
  }

  deleteRecurring(recurring: any) {
    this.confirmationService.confirm(Object.assign(this.deleteConfirmConfig,
      {
        accept: () => {
          if (recurring.isActive == true) {
            this.deleteConfirmed(recurring)
          } else {
            this.enableConfirmed(recurring)
          }
        },
        reject: () => {
        }
      }
    ));
  }

  deleteConfirmed(recurring: any) {
    let newRecurring = merge({}, recurring, {isActive: false});
    this.recurringService.updateRecurring(newRecurring).subscribe((response:any)=>{
      this.getRecurrings()
    })
  }

  enableConfirmed(brand: any) {
    let newRecurring = merge({}, brand, {isActive: true});
    this.recurringService.updateRecurring(newRecurring).subscribe((response:any)=>{
      this.getRecurrings()
    })
  }

  setUpdatedData(event: any) {
    if (event.type == "CREATE") {
      this.recurringList.push(event.data)
    } else {
      const index = this.recurringList.findIndex((x: any) => x.id === event.data.id);
      if (index !== -1) {
        this.recurringList.splice(index, 1, event.data);
      }
    }
  }
}
