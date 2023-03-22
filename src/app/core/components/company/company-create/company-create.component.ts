import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {setFormLoading} from "../../../store/Shared/shared.actions";
import {CustomValidationService} from "../../../services/customvalidation.service";
import {Company} from "../../../models/company.model";
import {addCompany, updateCompany} from "../state/company.actions";
import {merge} from "lodash";
import {getFormLoading} from "../../../store/Shared/shared.selector";
import {ContactTypes, iconClasses} from "../../../helpers/common-arrays";
import {phonePattern} from "../../../helpers/validation";
import {Countries} from "../../../helpers/country-list";
import {getCompanyById} from "../state/company.selector";

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {

  @Input()
  set companyId(companyId: any) {
    this.setCompanyData(companyId);
  }

  companyForm!: FormGroup;
  companySubscription: Subscription = new Subscription();
  company: any = {}
  showFormLoading: Observable<boolean> | undefined;
  contactTypes = ContactTypes;
  iconClass = iconClasses;
  countries = Countries;

  constructor(
    private fb: FormBuilder,
    private store: Store<CoreAppState>,
    private customValidator: CustomValidationService,
    private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    if (!this.companyForm) {
      this.initializeForms()
    }
    this.showFormLoading = this.store.select(getFormLoading);
  }

  setCompanyData(id: any) {
    if (id) {
      if (!this.companyForm) {
        this.initializeForms()
      }
      this.companySubscription = this.store.select(getCompanyById, {id}).subscribe((company) => {
        this.company = company;
        this.setContactFormArray();
        this.setAddressFormArray();
        this.companyForm.patchValue(this.company);
      })
    }
  }

  initializeForms() {
    this.companyForm = this.fb.group({
      companyName: new FormControl(null, [Validators.required]),
      companyRegistrationNumber: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      companyContactList: this.fb.array(
        [this.createContactFormGroup()],
        [Validators.required, Validators.maxLength(5)]
      ),
      companyAddressList: this.fb.array(
        [this.createAddressFormGroup()]
      ),
    })
  }

  saveCompany(msg: string) {
    if (!this.companyForm.valid) {
      this.companyForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const company: Company = this.companyForm.value;
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(addCompany({company, msg: msg}));
    }
  }

  updateBrand() {
    if (!this.companyForm.valid) {
      this.companyForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const company = merge({}, this.company, this.companyForm.value);
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(updateCompany({company}));
    }
  }

  createContactFormGroup() {
    return this.fb.group({
      id: [''],
      contactNumber: ['', [Validators.required, Validators.pattern(phonePattern)]],
      contactType: [null, [Validators.required]],
      companyId: [null],
      isActive: [true],
    })
  }

  get contacts(): any {
    return this.companyForm.get('companyContactList') as FormArray;
  }

  deleteContact(idx: any) {
    if (this.contacts.length > 1) {
      if (this.contacts.controls[idx].value.id) {
        this.contacts.controls[idx]["controls"].isActive.setValue(false);
      } else {
        this.contacts.removeAt(idx)
      }
    }
  }

  addContact() {
    let fg = this.createContactFormGroup();
    if (this.company.id) {
      fg.controls.companyId.setValue(this.company.id);
    }
    this.contacts.push(fg);
  }

  get addresses(): any {
    return this.companyForm.get('companyAddressList') as FormArray;
  }

  deleteAddress(idx: number) {
    if (this.addresses.length > 1) {
      if (this.addresses.controls[idx].value.id) {
        this.addresses.controls[idx]["controls"].isActive.setValue(false);
      } else {
        this.addresses.removeAt(idx)
      }
    }
  }

  addAddress() {
    let fg = this.createAddressFormGroup();
    if (this.company.id) {
      fg.controls.companyId.setValue(this.company.id);
    }
    this.addresses.push(fg);
  }

  createAddressFormGroup() {
    return this.fb.group({
      id: [''],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      country: [null, [Validators.required]],
      companyId: [null],
      isActive: [true],
    })
  }

  setContactFormArray() {
    while (this.company.companyContactList.length > this.contacts.length) {
      this.addContact();
    }
    return true;
  }

  setAddressFormArray() {
    while (this.company.companyAddressList.length > this.addresses.length) {
      this.addAddress();
    }
    return true;
  }



}
