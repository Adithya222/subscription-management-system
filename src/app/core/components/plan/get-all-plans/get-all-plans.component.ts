import {Component, OnInit} from '@angular/core';
import {setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import {emptyProductsArray} from "../../product/state/product.actions";
import {PlanFilter, PlanFilterFields} from "../../../models/plan.model";
import {HelperService} from "../../../services/helper.service";
import {deletePlan, emptyPlansArray, loadPlans, updatePlan} from "../state/plan.actions";
import {getPlans} from "../state/plan.selector";
import {ConfirmationService} from "primeng/api";
import {DeleteConfirmConfig} from "../../../helpers/common-arrays";
import {merge} from "lodash";
import {getLoading, getModal} from "../../../store/Shared/shared.selector";
import {setFilterOptions, setFilterOptionsFields} from "../../custom-components/filter/state/filter.actions";
import {flyInRight} from "../../../helpers/animations";
import {emptyBrandsArray} from "../../brand/state/brands.actions";
import {ProductFilter} from "../../../models/product.model";
import {BrandFilter} from "../../../models/brand.model";

@Component({
  selector: 'app-get-all-plans',
  templateUrl: './get-all-plans.component.html',
  styleUrls: ['./get-all-plans.component.css'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class GetAllPlansComponent implements OnInit {

  selectedPlanId: any = null;
  isShowModal: Observable<boolean> | undefined;
  filters: PlanFilter = new PlanFilter();
  brandFilters: BrandFilter = new BrandFilter();
  productFilters: ProductFilter = new ProductFilter();
  plans: Observable<any> | undefined;
  deleteConfirmConfig = DeleteConfirmConfig;
  showLoading: Observable<boolean> | undefined;
  filterFields = PlanFilterFields;


  constructor(
    private store: Store<CoreAppState>,
    private helperService: HelperService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isShowModal = this.store.select(getModal);
    this.store.dispatch(setFilterOptions({filters: this.filters}));
    this.store.dispatch(setFilterOptionsFields({filterOptionsFields: this.filterFields}));
    this.store.dispatch(emptyBrandsArray({filters: this.brandFilters}));
    this.store.dispatch(emptyPlansArray({filters: this.filters}));
    this.store.dispatch(emptyProductsArray({filters: this.productFilters}));


    this.getPlans(this.filters);
  }

  showModal() {
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }

  getPlans(event: any) {
    this.filters = event;
    this.plans = this.store.select(getPlans);
    this.store.dispatch(loadPlans({filters: this.filters}));
    // this.store.dispatch(loadPlans({filters: this.filters}));
  }

  onScroll() {
    this.filters = this.helperService.getFilterOptionsAsObject();
    this.filters.page++;
    this.getPlans(this.filters);
  }


  setFilteredData(event: any) {
    if (event == 'reset') {
      this.filters = new PlanFilter();
    } else {
      this.filters = this.helperService.getFilterOptionsAsObject();
      this.filters.page = 1;
    }
    this.store.dispatch(emptyProductsArray({filters: this.filters}));
    this.getPlans(this.filters)
  }


  editPlan(id: any) {
    this.selectedPlanId = id;
    this.store.dispatch(setModalStatus({status: true}));
  }

  deletePlan(plans: any) {
    this.confirmationService.confirm(Object.assign(this.deleteConfirmConfig,
      {
        accept: () => {
          if (plans.isActive == true) {
            this.deleteConfirmed(plans)
          } else {
            this.enableConfirmed(plans)
          }
        },
        reject: () => {
        }
      }
    ));

  }

  deleteConfirmed(plan: any) {
    let newPlan = merge({}, plan, {isActive: false});
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(updatePlan({plan: newPlan}))
  }

  enableConfirmed(plan: any) {
    let newPlan = merge({}, plan, {isActive: true});
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(updatePlan({plan: newPlan}))
  }
}
