import {Component, OnInit} from '@angular/core';
import {emptyProductsArray} from "../../product/state/product.actions";
import {InvoiceFilter} from "../../../models/invoice.model";
import {HelperService} from "../../../services/helper.service";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import {InvoiceService} from "../../../services/invoice.service";
import {StoreService} from "../../../services/store";
import {setModalStatus} from "../../../store/Shared/shared.actions";
import {flyInRight} from "../../../helpers/animations";
import {ConfirmationService} from "primeng/api";
import {getLoading, getModal} from "../../../store/Shared/shared.selector";
import {setFilterOptions, setFilterOptionsFields} from "../../custom-components/filter/state/filter.actions";
import {ProductFilterFields} from "../../../models/product.model";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class InvoiceListComponent implements OnInit {

  filters: InvoiceFilter = new InvoiceFilter();
  invoiceList: any = [];
  authUser: any = null
  planId: any;
  userId: any
  isShowModal: Observable<boolean> | undefined;
  selectedInvoiceId: any;
  showLoading: Observable<boolean> | undefined;
  filterFields = ProductFilterFields;

  constructor(
    private helperService: HelperService,
    private store: Store<CoreAppState>,
    private invoiceService: InvoiceService,
    private storeService: StoreService,
  ) {
  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isShowModal = this.store.select(getModal);
    this.store.dispatch(setFilterOptions({filters: this.filters}));
    this.store.dispatch(setFilterOptionsFields({filterOptionsFields: this.filterFields}));

    this.checkUser()
  }

  showModal() {
    this.selectedInvoiceId = null;
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }


  checkUser() {
    this.authUser = this.storeService.getData('auth.currentUser')
    this.authUser = JSON.parse(this.authUser)
    this.planId = this.authUser.attributes.planId[0]
    this.userId = this.authUser.id
    this.getInvoices(this.filters)
  }

  setFilteredData(event: any) {
    if (event == 'reset') {
      this.filters = new InvoiceFilter();
    } else {
      this.filters = this.helperService.getFilterOptionsAsObject();
      this.filters.page = 1;
    }
    this.store.dispatch(emptyProductsArray({filters: this.filters}));
    this.getInvoices(this.filters)
  }

  onScroll() {
    this.filters = this.helperService.getFilterOptionsAsObject();
    this.filters.page++;
    this.getInvoices(this.filters);
  }


  getInvoices(id: any) {
    this.invoiceService.getInvoice(this.filters).subscribe((response: any) => {
      this.invoiceList = [...this.invoiceList, ...response.data.data]
    })

  }

  viewInvoice(id:any) {
    this.selectedInvoiceId = id;
    this.store.dispatch(setModalStatus({status: true}));
  }

  setUpdatedData(event: any) {
     const index = this.invoiceList.findIndex((x:any) => x.id === event.id);
    if (index !== -1) { this.invoiceList.splice(index, 1, event); }
  }
}
