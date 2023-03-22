import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {Router} from "@angular/router";
import {Customer} from "../../../models/customer.model";
import {addCustomer, updateCustomer} from "../state/customer.actions";
import {Observable, Subscription} from "rxjs";
import {getCustomerById} from "../state/customer.selector";
import {setFormLoading} from "../../../store/Shared/shared.actions";
import {getFormLoading} from "../../../store/Shared/shared.selector";
import {ContactTypes, DeleteConfirmConfig, iconClasses} from "../../../helpers/common-arrays";
import {Countries} from "../../../helpers/country-list";
import {CustomValidationService} from "../../../services/customvalidation.service";
import {HelperService} from "../../../services/helper.service";
import {emailPattern, phonePattern} from "../../../helpers/validation";
import {merge} from "lodash";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {


  @Input()
  set customerId(customerId: any) {
    if (customerId) {
      this.setCustomerData(customerId);
    }
  }

  customerForm!: FormGroup;
  customer: any;
  contactTypes = ContactTypes;
  iconClass = iconClasses;
  countries = Countries;
  customerSubscription: Subscription = new Subscription();
  showFormLoading: Observable<boolean> | undefined;
  deleteConfirmConfig = DeleteConfirmConfig;


  constructor(
    private fb: FormBuilder,
    private store: Store<CoreAppState>,
    private router: Router,
    private customValidator: CustomValidationService,
    private el: ElementRef,
    private helperService: HelperService,
  ) {
  }

  ngOnInit(): void {
    if (!this.customerForm) {
      this.initializeForms()
    }
    this.showFormLoading = this.store.select(getFormLoading);
  }

  initializeForms() {
    this.customerForm = this.fb.group({
      customerName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(emailPattern)]),
      contactList: this.fb.array(
        [this.createContactFormGroup()],
        [Validators.required, Validators.maxLength(5)]
      ),
      addressList: this.fb.array(
        [this.createAddressFormGroup()]
      ),
      description: [''],
      isActive: new FormControl(false),
    });
  }


  createContactFormGroup() {
    return this.fb.group({
      id: [null],
      contactNumber: ['', [Validators.required, Validators.pattern(phonePattern)]],
      contactType: [null, [Validators.required]],
      customerId: [null],
      isActive: [true],
    })
  }

  createAddressFormGroup() {
    return this.fb.group({
      id: [null],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      country: [null, [Validators.required]],
      customerId: [null],
      isActive: [true],
    })
  }

  get contacts(): any {
    return this.customerForm.get('contactList') as FormArray;
  }

  get addresses(): any {
    return this.customerForm.get('addressList') as FormArray;
  }

  addContact() {
    let fg = this.createContactFormGroup();
    if (this.customer.id) {
      fg.controls.customerId.setValue(this.customer.id);
    }
    this.contacts.push(fg);
  }

  addAddress() {
    let fg = this.createAddressFormGroup();
    if (this.customer.id) {
      fg.controls.customerId.setValue(this.customer.id);
    }
    this.addresses.push(fg);
  }

  deleteContact(idx: number) {
    if (this.contacts.length > 1) {
      this.contacts.removeAt(idx);
    }
  }

  deleteAddress(idx: number) {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(idx);
    }
  }


  saveCustomer(msg: string) {
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const customer: Customer = this.customerForm.value;
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(addCustomer({customer, msg: msg}));
    }
  }

  setCustomerData(id: any) {
    if (id) {
      if (!this.customerForm) {
        this.initializeForms()
      }
      this.customerSubscription = this.store.select(getCustomerById, {id}).subscribe((data) => {
        this.customer = data;
        this.setContactFormArray();
        this.setAddressFormArray();
        this.customerForm.patchValue({...this.customer})
      })
    }
  }

  setContactFormArray() {
    while (this.customer.contactList.length > this.contacts.length) {
      this.addContact();
    }
    return true;
  }

  setAddressFormArray() {
    while (this.customer.addressList.length > this.addresses.length) {
      this.addAddress();
    }
    return true;
  }

  updateCustomer() {
    if (!this.customerForm.valid) {
      this.customerForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      let customer = merge({}, this.customer, this.customerForm.value);
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(updateCustomer({customer}));
    }
  }

  ngOnDestroy(): void {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }


  clear() {
    this.customerForm.reset();
    this.customer = {};
  }
}
