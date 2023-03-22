import {Component, OnInit} from '@angular/core';
import {StoreService} from "../../../services/store";
import {ProductService} from "../../../services/product.service";
import {PlanService} from "../../../services/plan.service";
import {InvoiceService} from "../../../services/invoice.service";
import {Observable} from "rxjs";
import {setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {flyInRight} from "../../../helpers/animations";
import {ConfirmationService} from "primeng/api";
import {getLoading, getModal} from "../../../store/Shared/shared.selector";

@Component({
  selector: 'app-valid-product-list',
  templateUrl: './valid-product-list.component.html',
  styleUrls: ['./valid-product-list.component.css'],
  animations: [flyInRight],
  providers: [ConfirmationService]
})
export class ValidProductListComponent implements OnInit {
  authUser: any = null
  planId: any;
  productList: any;
  planList: any;
  userId: any
  invoiceList: any;
  selectedPlanId: any;
  isShowModal: Observable<boolean> | undefined;
  showLoading: Observable<boolean> | undefined;


  constructor(
    private storeService: StoreService,
    private productService: ProductService,
    private planService: PlanService,
    private incoiceService: InvoiceService,
    private store: Store<CoreAppState>,
  ) {
  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isShowModal = this.store.select(getModal);
    this.checkUser()
  }


  checkUser() {
    this.authUser = this.storeService.getData('auth.currentUser')
    this.authUser = JSON.parse(this.authUser)
    this.planId = this.authUser.attributes.planId[0]
    this.userId = this.authUser.id
    this.getProductsByPlanId(this.planId)
    this.getPlan(this.planId);
    this.getInvoiceByUserId(this.userId)
  }

  getProductsByPlanId(id: any) {
    this.productService.getProductsByPlanId(id).subscribe((response: any) => {
      this.productList = response.data.data
    })
  }

  getPlan(id: any) {
    this.planService.getPlanById(id).subscribe((response: any) => {
      this.planList = response.data.data[0]
    })
  }

  getInvoiceByUserId(id: any) {
    this.incoiceService.getLatestInvoice(id).subscribe((response: any) => {
      this.invoiceList = response.data.data
    })
  }

  showModal() {
    this.selectedPlanId = this.planId
    this.store.dispatch(setModalStatus({status: true}));
  }

  closeModal(event: any = null) {
    this.store.dispatch(setModalStatus({status: false}));
  }
}
