import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {getProductById} from "../../product/state/product.selector";
import {InvoiceService} from "../../../services/invoice.service";
import {Subscription} from "rxjs";
import {InvoiceFilter} from "../../../models/invoice.model";
import {InvoiceApproveStatus} from "../../../helpers/common-arrays";
import {setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  @Output() outputData = new EventEmitter<any>()

  @Input()
  set invoiceId(invoiceId: any) {
    this.setInvoiceData(invoiceId);
  }

  invoice: any = {};
  invoiceSubscription: Subscription = new Subscription();
  newStatus: any;
  invoiceApproveStatus = InvoiceApproveStatus
  filter: InvoiceFilter = new InvoiceFilter();


  constructor(
    private invoiceService: InvoiceService,
    private store: Store<CoreAppState>,
  ) {
  }

  ngOnInit(): void {
  }


  setInvoiceData(id: any) {
    this.filter.id = id
    if (id) {
      this.getInvoiceData()
    }
  }

  getInvoiceData() {
    this.invoiceService.getInvoice(this.filter).subscribe((response: any) => {
      this.invoice = response.data.data[0]

    })
  }

  saveInvoice() {
    this.invoice.status = this.newStatus
    this.invoiceService.updateInvoiceStatus(this.invoice).subscribe((response: any) => {
      if (response.status == 'SUCCESS') {
        this.store.dispatch(setModalStatus({status: false}));
        // this.getInvoiceData()
        this.outputData.emit(response.data.data);
      }
    })

  }
}
