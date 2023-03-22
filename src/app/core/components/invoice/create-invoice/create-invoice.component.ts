import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrencyList, Recurring, RecurringCycle} from "../../../helpers/common-arrays";
import {PlanTotal} from "../../../../models/total.model";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {InitializerService} from "../../../services/auth/initializer.service";
import {PlanService} from "../../../services/plan.service";
import {Subscription} from "rxjs";
import {DatePipe} from "@angular/common";
import {InvoiceService} from "../../../services/invoice.service";
import {StoreService} from "../../../services/store";
import {setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  dateToday: any;
  userId: any;
  formatedDate: any;

  @Input()
  set planID(plan: any) {
    this.setPlanData(plan);
  }

  invoiceForm!: FormGroup;
  currencyList = CurrencyList;
  totalObj: PlanTotal = new PlanTotal();
  planId: any = 1
  authUser: any
  invoiceSubscription: Subscription = new Subscription();
  planList: any;

  recurring = Recurring
  recurringCycle = RecurringCycle
  subTotal: number = 0


  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private store: Store<CoreAppState>,
    private initilizerService: InitializerService,
    private planService: PlanService,
    public datepipe: DatePipe,
    private invoiceService: InvoiceService,
    private storeService: StoreService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {

    this.authUser = this.storeService.getData('auth.currentUser')
    this.authUser = JSON.parse(this.authUser)
    this.planId = this.authUser.attributes.planId[0]
    this.userId = this.authUser.id
    this.newDate()
    if (!this.invoiceForm) {
      this.initializeForms()
    }


  }

  initializeForms() {

    this.invoiceForm = this.fb.group({
      date: new FormControl({value: this.dateToday, disabled: true}),
      currency: new FormControl(null),
      recurring: new FormControl(null, [Validators.required]),
      recurringCycle: new FormControl({value: '', disabled: true}),
      note: new FormControl(''),
      total: new FormControl(''),
      planId: new FormControl(''),
      status: new FormControl(''),
      subscriberId: new FormControl(''),

    })
  }

  getPlan(id: any) {
    this.planService.getPlanById(id).subscribe((response: any) => {
      this.planList = response.data.data[0]
      this.setDataToTheForm()

    })
  }

  setDataToTheForm() {
    this.invoiceForm.controls['recurringCycle'].setValue(this.planList.recurringCycle)
    this.invoiceForm.controls['total'].setValue(this.planList.price)
    this.invoiceForm.controls['planId'].setValue(this.planList.id)
    this.invoiceForm.controls['subscriberId'].setValue(this.userId)
  }

  setPlanData(id: any) {
    this.getPlan(id)
    this.newDate()
    if (id) {
      if (!this.invoiceForm) {
        this.initializeForms()
      }
    }
  }

  newDate() {
    this.dateToday = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.formatedDate = this.datepipe.transform(this.dateToday, 'dd-MM-yyyy')
  }


  saveInvoice() {
    this.invoiceForm.controls['status'].setValue('PENDING')
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.invoiceForm.controls['date'].setValue(this.formatedDate)
    this.invoiceService.addInvoice(this.invoiceForm.getRawValue()).subscribe((response: any) => {
      if (response.status == 'SUCCESS') {
        this.toastr.success('Invoice Created Successful !');
        this.store.dispatch(setModalStatus({status: false}));
        this.store.dispatch(setLoadingSpinner({status: false}))

      }
    })
  }

}
