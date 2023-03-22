import {Component, OnInit} from '@angular/core';
import {BrandFilter, BrandFilterFields} from "../../../models/brand.model";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import {deleteBrand, emptyBrandsArray, loadBrands, updateBrand} from "../state/brands.actions";
import {NgxSpinnerService} from "ngx-spinner";
import {ConfirmationService} from "primeng/api";
import {getLoading, getModal} from "../../../store/Shared/shared.selector";
import {setFilterOptions, setFilterOptionsFields} from "../../custom-components/filter/state/filter.actions";
import {setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {emptyProductsArray} from "../../product/state/product.actions";
import {flyInRight} from "../../../helpers/animations";
import {DeleteConfirmConfig} from "../../../helpers/common-arrays";
import {HelperService} from "../../../services/helper.service";
import {getBrands} from '../state/brands.selector';
import {merge} from "lodash";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class BrandListComponent implements OnInit {

  filters: BrandFilter = new BrandFilter();
  filterFields = BrandFilterFields;
  selectedBrandId: any = null;
  isShowModal: Observable<boolean> | undefined;
  brands: Observable<any> | undefined;
  showLoading: Observable<boolean> | undefined;
  search: any;
  deleteConfirmConfig = DeleteConfirmConfig;


  constructor(
    private store: Store<CoreAppState>,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private helperService: HelperService,
  ) {
  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isShowModal = this.store.select(getModal);
    this.store.dispatch(setFilterOptions({filters: this.filters}));
    this.store.dispatch(setFilterOptionsFields({filterOptionsFields: this.filterFields}));
    this.store.dispatch(emptyBrandsArray({filters: this.filters}));
    this.getBrands(this.filters);
  }

  getBrands(event: any) {
    this.filters = event;
    this.brands = this.store.select(getBrands);
    this.store.dispatch(loadBrands({filters: this.filters}));
  }

  showModal() {
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }

  editBrand(id: any) {
    this.selectedBrandId = id;
    this.store.dispatch(setModalStatus({status: true}));
  }

  deleteBrand(brand: any) {
    this.confirmationService.confirm(Object.assign(this.deleteConfirmConfig,
      {
        accept: () => {
          if (brand.isActive == true) {
            this.deleteConfirmed(brand)
          } else {
            this.enableConfirmed(brand)
          }
        },
        reject: () => {
        }
      }
    ));
  }

  deleteConfirmed(brand: any) {
    let newBrand = merge({}, brand, {isActive: false});
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(updateBrand({brand: newBrand}))
  }

  enableConfirmed(brand: any) {
    let newBrand = merge({}, brand, {isActive: true});
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(updateBrand({brand: newBrand}))
  }

  onScroll() {
    this.filters = this.helperService.getFilterOptionsAsObject();
    this.filters.page++;
    this.getBrands(this.filters);
  }

  setFilteredData(event: any) {
    if (event == 'reset') {
      this.filters = new BrandFilter();
    } else {
      this.filters = this.helperService.getFilterOptionsAsObject();
      this.filters.page = 1;
    }
    this.store.dispatch(emptyProductsArray({filters: this.filters}));
    this.getBrands(this.filters)
  }

}
