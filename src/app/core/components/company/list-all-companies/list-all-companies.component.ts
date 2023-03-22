import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {emptyProductsArray} from "../../product/state/product.actions";
import {CompanyFilter, CompanyFilterFields} from "../../../models/company.model";
import {HelperService} from "../../../services/helper.service";
import {getCompany} from "../state/company.selector";
import {deleteCompany, loadCompanies} from "../state/company.actions";
import {ConfirmationService} from "primeng/api";
import {DeleteConfirmConfig} from "../../../helpers/common-arrays";
import {merge} from "lodash";
import {getLoading, getModal} from "../../../store/Shared/shared.selector";
import {setFilterOptions, setFilterOptionsFields} from "../../custom-components/filter/state/filter.actions";
import {flyInRight} from "../../../helpers/animations";

@Component({
  selector: 'app-list-all-companies',
  templateUrl: './list-all-companies.component.html',
  styleUrls: ['./list-all-companies.component.css'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class ListAllCompaniesComponent implements OnInit {

  isShowModal: Observable<boolean> | undefined;
  selectedCompanyId: any = null;
  filters: CompanyFilter = new CompanyFilter();
  companies: Observable<any> | undefined;
  deleteConfirmConfig = DeleteConfirmConfig;
  showLoading: Observable<boolean> | undefined;
  filterFields = CompanyFilterFields;




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
    this.getCompanies(this.filters);
  }

  showModal() {
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }

  getCompanies(event: any) {
    this.filters = event;
    this.companies = this.store.select(getCompany);
    this.store.dispatch(loadCompanies({filters: this.filters}));
  }

  setFilteredData(event: any) {
    if (event == 'reset') {
      this.filters = new CompanyFilter();
    } else {
      this.filters = this.helperService.getFilterOptionsAsObject();
      this.filters.page = 1;
    }
    this.store.dispatch(emptyProductsArray({filters: this.filters}));
    this.getCompanies(this.filters)
  }

  onScroll() {
    this.filters = this.helperService.getFilterOptionsAsObject();
    this.filters.page++;
    this.getCompanies(this.filters);
  }

  editCompany(id: any) {
    this.selectedCompanyId = id;
    this.store.dispatch(setModalStatus({status: true}));
  }

  deleteCompany(company: any) {
    this.confirmationService.confirm(Object.assign(this.deleteConfirmConfig,
      {
        accept: () => {
          this.deleteConfirmed(company)
        },
        reject: () => {
        }
      }
    ));
  }

  deleteConfirmed(company: any) {
    let newCompany = merge({}, company, {isActive: false});
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(deleteCompany ({company : newCompany}))
  }


}
