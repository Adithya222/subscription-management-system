import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {deleteCustomer, emptyCustomersArray, loadCustomers} from "../state/customer.actions";
import {ConfirmationService} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {getLoading, getModal} from "../../../store/Shared/shared.selector";
import {setFilterOptions, setFilterOptionsFields} from "../../custom-components/filter/state/filter.actions";
import {setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {Customer, CustomerFilter, CustomerFilterFields} from "../../../models/customer.model";
import {flyInRight} from "../../../helpers/animations";
import {DeleteConfirmConfig} from "../../../helpers/common-arrays";
import {HelperService} from "../../../services/helper.service";
import {getCustomers} from '../state/customer.selector';
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class CustomerListComponent implements OnInit {

  filters: CustomerFilter = new CustomerFilter();
  filterFields = CustomerFilterFields;
  isShowModal: Observable<boolean> | undefined;
  customers: Observable<Customer[]> | undefined;
  selectedCustomerId: any = null;
  showLoading: Observable<boolean> | undefined;
  deleteConfirmConfig = DeleteConfirmConfig;
  userList: any;

  constructor(
    private store: Store<CoreAppState>,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private customerService : CustomerService
  ) {
  }

  ngOnInit(): void {

    this.getAllCustomers();
    this.showLoading = this.store.select(getLoading);
    this.isShowModal = this.store.select(getModal);
    this.store.dispatch(setFilterOptions({filters: this.filters}));
    this.store.dispatch(setFilterOptionsFields({filterOptionsFields: this.filterFields}));
    this.getCustomers(this.filters);
    this.store.dispatch(emptyCustomersArray({filters: this.filters}));
  }

  getCustomers(event: any) {
    this.filters = event;
    this.customers = this.store.select(getCustomers);
    this.store.dispatch(setFilterOptions({filters: this.filters}));
    this.store.dispatch(loadCustomers({filters: this.filters}));
  }

  showModal() {
    this.selectedCustomerId = null;
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }

  onScroll() {
    this.filters = this.helperService.getFilterOptionsAsObject();
    this.filters.page++;
    this.getCustomers(this.filters);
  }

  editCustomer(id: any) {
    this.selectedCustomerId = id;
    this.store.dispatch(setModalStatus({status: true}));
  }

  deleteCustomer(id: any) {
    this.confirmationService.confirm(Object.assign(this.deleteConfirmConfig,
      {
        accept: () => {
          this.deleteConfirmed(id)
        },
        reject: () => {
        }
      }
    ));
  }

  deleteConfirmed(id: any) {
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(deleteCustomer({id}))
  }

  setFilteredData(event: any) {
    if (event == 'reset') {
      this.filters = new CustomerFilter();
    } else {
      this.filters = this.helperService.getFilterOptionsAsObject();
      this.filters.page = 1;
    }
    // this.customers = this.store.select(removeCustomers);
    this.store.dispatch(emptyCustomersArray({filters: this.filters}));
    this.getCustomers(this.filters)
  }

  getAllCustomers(){
    this.customerService.getUsers().subscribe(response => {
      this.userList = response.data.users

      console.log(this.userList);

    })
  }


}
