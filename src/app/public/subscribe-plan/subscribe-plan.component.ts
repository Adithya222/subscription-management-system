import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactTypes, iconClasses} from "../../core/helpers/common-arrays";
import {Countries} from "../../core/helpers/country-list";
import {Observable, Subscription} from "rxjs";
import {CoreAppState} from "../../core/store/app.state";
import {Router} from "@angular/router";
import {CustomValidationService} from "../../core/services/customvalidation.service";
import {getFormLoading} from "../../core/store/Shared/shared.selector";
import {emailPattern, phonePattern} from "../../core/helpers/validation";
import {PlanService} from "../../core/services/plan.service";
import {PlanFilter} from "../../core/models/plan.model";
import {CustomerService} from "../../core/services/customer.service";
import {Store} from "@ngrx/store";
import {StoreService} from "../../core/services/store";
import {InvoiceService} from "../../core/services/invoice.service";
import {Invoice} from "../../core/models/invoice.model";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-subscribe-plan',
  templateUrl: './subscribe-plan.component.html',
  styleUrls: ['./subscribe-plan.component.css']
})
export class SubscribePlanComponent implements OnInit {

  customerForm!: FormGroup;
  customer: any = {};
  contactTypes = ContactTypes;
  iconClass = iconClasses;
  countries = Countries;
  customerSubscription: Subscription = new Subscription();
  showFormLoading: Observable<boolean> | undefined;
  filters: any = new PlanFilter();
  planList: any;
  showPlans: boolean = true
  planId: any;
  authUser: any = null
  invoice: any
  userData: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<CoreAppState>,
    private router: Router,
    private customValidator: CustomValidationService,
    private el: ElementRef,
    private planService: PlanService,
    private customerService: CustomerService,
    private storeService: StoreService,
    private invoiceService: InvoiceService,
    public datepipe: DatePipe,
    private toastr: ToastrService,
  ) {
  }

  async ngOnInit() {
    await this.checkUser();
    if (!this.customerForm) {
      this.initializeForms()
    }
    this.getAllPlans()
    this.showFormLoading = this.store.select(getFormLoading);
  }

  initializeForms() {
    this.customerForm = this.fb.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.pattern(emailPattern)]),
      password: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern(phonePattern)]),
      landNumber: new FormControl(null, [Validators.required, Validators.pattern(phonePattern)]),
      addressLine1: new FormControl(null, [Validators.required]),
      addressLine2: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      postcode: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      website: [''],
      notes: [''],
      isActive: new FormControl(false),
    });
  }

  getAllPlans() {
    this.filters.isActive = true
    this.planService.getPlans(this.filters).subscribe(response => {
      this.planList = response

    })
  }

  getPlan(id: any) {
    this.planService.getPlanById(id).subscribe((response: any) => {
      this.planList = response.data.data[0]
    })
  }

  subscribePlan(planId: any) {
    this.planId = planId

    this.getPlan(this.planId)
    this.showPlans = false
  }

  clear() {
    this.customerForm.reset();
    this.customer = {};
  }

  createTrailInvoice(authId: any) {
    var date = new Date()
    let latest_date = this.datepipe.transform(date, 'dd-MM-yyyy');


    var invoice = {
      'currency': null,
      'invoiceNo': null,
      'recurring': null,
      'date': latest_date,
      'dueDate': null,
      'status': 'TRIAL',
      'recurringCycle': this.planList.recurringCycle,
      'planId': this.planId,
      'subscriberId': authId,
      'total': null
    }

    this.invoiceService.addInvoice(invoice).subscribe(response => {

    })

  }

  saveCustomer(msg: string) {
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      var obj = {
        firstname: this.customerForm.value.firstName,
        lastname: this.customerForm.value.lastName,
        email: this.customerForm.value.email,
        username: this.customerForm.value.email,
        password: this.customerForm.value.password,
        createdAt: 0,
        emailVerified: true,
        userEnabled: true,
        authId: null,
        roles: {
          role: ['uma_authorization']
        },
        attributes: {
          planId: [this.planId],
          mobile: [this.customerForm.value.mobile],
          landNumber: [this.customerForm.value.landNumber],
          addressLine1: [this.customerForm.value.addressLine1],
          addressLine2: [this.customerForm.value.addressLine2],
          city: [this.customerForm.value.city],
          state: [this.customerForm.value.state],
          postcode: [this.customerForm.value.postcode],
          country: [this.customerForm.value.country],
          website: [this.customerForm.value.website],
          notes: [this.customerForm.value.notes],
        },
      }

      this.customerService.addUser(obj).subscribe(response => {
        if (response.status == 'ERROR') {
          this.toastr.error('User Already Exist');
        } else {
          this.userData = response.data.user
          this.createTrailInvoice(this.userData.authId)

          // debugger
          this.router.navigate(['/product/valid-product-list']);

        }
      })


    }
  }

  checkUser() {
    this.authUser = this.storeService.getData('auth.currentUser')
    this.authUser = JSON.parse(this.authUser)
    if (this.authUser) {
      this.router.navigate(['/product/valid-product-list']);
    }
  }

  login() {
    this.router.navigate(['/product/valid-product-list']);
  }
}
