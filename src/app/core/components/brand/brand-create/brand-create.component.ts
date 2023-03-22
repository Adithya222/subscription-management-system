import {Component, ElementRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Brand} from "../../../models/brand.model";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {addBrand, updateBrand} from "../state/brands.actions";
import {getBrandById} from "../state/brands.selector";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {setFormLoading, setLoadingSpinner} from "../../../store/Shared/shared.actions";
import {CustomValidationService} from "../../../services/customvalidation.service";
import {ToastrService} from "ngx-toastr";
import {getFormLoading} from "../../../store/Shared/shared.selector";
import {DeleteConfirmConfig} from "../../../helpers/common-arrays";
import {merge} from "lodash";

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.css']
})
export class BrandCreateComponent implements OnInit, OnDestroy {

  @Input()
  set brandId(brandId: any) {
    this.setBrandData(brandId);
  }

  brandForm!: FormGroup;
  brand: any;
  brandSubscription: Subscription = new Subscription();
  supplierSubscription: Subscription = new Subscription();
  showFormLoading: Observable<boolean> | undefined;
  deleteConfirmConfig = DeleteConfirmConfig;

  constructor(
    private fb: FormBuilder,
    private store: Store<CoreAppState>,
    private router: Router,
    private customValidator: CustomValidationService,
    private el: ElementRef,
    private toast: ToastrService,
  ) {
  }

  ngOnInit(): void {
    if (!this.brandForm) {
      this.initializeForms()
    }
    this.showFormLoading = this.store.select(getFormLoading);
  }

  initializeForms() {
    this.brandForm = this.fb.group({
      brandName: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  }

  saveBrand(msg: string) {
    if (!this.brandForm.valid) {
      this.brandForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const brand: Brand = this.brandForm.value;
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(addBrand({brand, msg: msg}));
    }
  }

  updateBrand() {
    if (!this.brandForm.valid) {
      this.brandForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const brand = merge({}, this.brand, this.brandForm.value);
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(updateBrand({brand}));
    }
  }

  /*
  * this method can use when use @input to pass the parameters
  * */
  setBrandData(id: any) {
    if (id) {
      if (!this.brandForm) {
        this.initializeForms()
      }
      this.brandSubscription = this.store.select(getBrandById, {id}).subscribe((brand) => {
        this.brand = brand;
        this.brandForm.patchValue(this.brand);
      })
    }
  }

  /*
* this method can use for when parameters pass with the url
* */
  // setBrandData(id: any) {
  //     this.brandSubscription = this.store.select(getBrandById).subscribe((brand) => {
  // if(brand) {
  //     this.brand = brand;
  //     this.brandForm.patchValue(this.brand);
  // }
  //     })
  // }

  ngOnDestroy(): void {
    if (this.brandSubscription) {
      this.brandSubscription.unsubscribe();
    }
  }


}
