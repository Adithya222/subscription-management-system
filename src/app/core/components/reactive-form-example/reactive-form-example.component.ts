import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../store/app.state";
import {Router} from "@angular/router";
import {Brand} from "../../models/brand.model";
import {addBrand, updateBrand} from "../brand/state/brands.actions";
import {getBrandById} from "../brand/state/brands.selector";
import {CustomValidationService} from "../../services/customvalidation.service";

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.css']
})
export class ReactiveFormExampleComponent implements OnInit {

  @Input()
  set brandId(brandId: any) {
    this.setBrandData(brandId);
  }

  brandForm!: FormGroup;
  brand: any;
  brandSubscription: Subscription = new Subscription();
  // removeIcon = RemoveIcon;
  // removeIconClass = RemoveIconClass;
  // addIcon = AddIcon;
  // addIconClass = AddIconClass;

  constructor(
      private store: Store<CoreAppState>,
      private router: Router,
      private customValidator: CustomValidationService,
      private el: ElementRef,
      private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      employees: this.fb.array(
          [this.createEmpFormGroup()],
          [Validators.required, Validators.maxLength(5)]
      )
    })
  }

  createEmpFormGroup() {
    return this.fb.group({
      empName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(21)]],
      skill: ['', [Validators.required]],
    })
  }

  get registerFormControl() {
    return this.brandForm.controls;
  }

  get employees(): FormArray {
    return this.brandForm.get('employees') as FormArray;
  }

  addEmployee() {
    let fg = this.createEmpFormGroup();
    this.employees.push(fg);
  }

  deleteEmployee(idx: number) {
    this.employees.removeAt(idx);
  }

  saveBrand(msg: string) {
    if (!this.brandForm.valid) {
      this.brandForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const brand: Brand = this.brandForm.value;
      this.store.dispatch(addBrand({brand, msg: msg}));
    }
  }

  updateBrand() {
    if (!this.brandForm.valid) {
      return;
    }
    const brand: Brand = this.brandForm.value;
    this.store.dispatch(updateBrand({brand}));
  }

  setBrandData(id: any) {
    this.brandSubscription = this.store.select(getBrandById, {id}).subscribe((data) => {
      this.brand = data;
      this.brandForm.patchValue(this.brand)
    })
  }

  ngOnDestroy(): void {
    if(this.brandSubscription){
      this.brandSubscription.unsubscribe();
    }
  }


}
