import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {getProductById, getProducts} from '../state/product.selector';
import {deleteProduct, emptyProductsArray, loadProducts, updateProduct} from "../state/product.actions";
import {ConfirmationService} from "primeng/api";
import {getLoading, getModal, getModal2} from "../../../store/Shared/shared.selector";
import {setLoadingSpinner, setModal2Status, setModalStatus} from "../../../store/Shared/shared.actions";
import {Product, ProductFilter, ProductFilterFields} from "../../../models/product.model";
import {setFilterOptions, setFilterOptionsFields} from "../../custom-components/filter/state/filter.actions";
import {flyInRight} from "../../../helpers/animations";
import {DeleteConfirmConfig} from "../../../helpers/common-arrays";
import {HelperService} from "../../../services/helper.service";
import {CurrencyCode} from "../../../helpers/common-variables";
import {AddNewItem} from "../../../models/add-new-item.model";
import {merge} from "lodash";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class ProductListComponent implements OnInit {

  filters: ProductFilter = new ProductFilter();
  filterFields = ProductFilterFields;
  isShowModal: Observable<boolean> | undefined;
  isShowModal2: Observable<AddNewItem> | undefined;
  products: Observable<Product[]> | undefined;
  selectedProductId: any = null;
  showLoading: Observable<boolean> | undefined;
  deleteConfirmConfig = DeleteConfirmConfig;
  currency = CurrencyCode;
  selectedForm: any;

  constructor(
    private store: Store<CoreAppState>,
    private confirmationService: ConfirmationService,
    private helperService: HelperService,
  ) {
  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isShowModal = this.store.select(getModal);
    this.isShowModal2 = this.store.select(getModal2);
    this.store.dispatch(setFilterOptions({filters: this.filters}));
    this.store.dispatch(setFilterOptionsFields({filterOptionsFields: this.filterFields}));
    this.store.dispatch(emptyProductsArray({filters: this.filters}));
    this.getProducts(this.filters);
  }

  getProducts(event: any) {
    this.filters = event;
    this.products = this.store.select(getProducts);
    this.store.dispatch(loadProducts({filters: this.filters}));
  }

  showModal() {
    this.selectedForm = 'productCreate'
    this.selectedProductId = null;
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }

  closeModal2(event: any = null) {
    this.store.dispatch(setModal2Status({addNewItem: {component: 'brand', status: false}}));
  }

  onScroll() {
    this.filters = this.helperService.getFilterOptionsAsObject();
    this.filters.page++;
    this.getProducts(this.filters);
  }

  editProduct(id: any) {
    this.selectedForm = 'productCreate'
    this.selectedProductId = id;
    this.store.dispatch(setModalStatus({status: true}));
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm(Object.assign(this.deleteConfirmConfig,
      {
        accept: () => {

          if (product.isActive == true) {
            this.deleteConfirmed(product)
          } else {
            this.enableConfirmed(product)
          }

        },
        reject: () => {
        }
      }
    ));
  }

  deleteConfirmed(product: any) {
    let newProduct = merge({}, product, {isActive: false});
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(updateProduct({product: newProduct}))
  }

  enableConfirmed(product: any) {
    let newProduct = merge({}, product, {isActive: true});
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(updateProduct({product: newProduct}))
  }

  viewProduct(id: any) {
    this.selectedForm = 'viewProduct'
    this.selectedProductId = id;
    // this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(setModalStatus({status: true}));
  }

  setFilteredData(event: any) {
    if (event == 'reset') {
      this.filters = new ProductFilter();
    } else {
      this.filters = this.helperService.getFilterOptionsAsObject();
      this.filters.page = 1;
    }
    this.store.dispatch(emptyProductsArray({filters: this.filters}));
    this.getProducts(this.filters)
  }


}
