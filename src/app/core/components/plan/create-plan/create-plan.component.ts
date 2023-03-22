import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {getPlanById} from "../state/plan.selector";
import {setFormLoading} from "../../../store/Shared/shared.actions";
import {CustomValidationService} from "../../../services/customvalidation.service";
import {Plan} from "../../../models/plan.model";
import {addPlan, updatePlan} from "../state/plan.actions";
import {merge} from "lodash";
import {getFormLoading} from "../../../store/Shared/shared.selector";
import {Product, ProductFilter} from "../../../models/product.model";
import {getProducts} from "../../product/state/product.selector";
import {emptyProductsArray, loadProducts} from "../../product/state/product.actions";
import {iconClasses} from "../../../helpers/common-arrays";
import {PlanService} from "../../../services/plan.service";
import {ToastrService} from "ngx-toastr";
import {RecurringService} from "../../../services/recurring.service";
import {RecurringFilter} from "../../../models/recurring.model";

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {

  @Input()
  set PlanId(planId: any) {
    this.setPlanData(planId);
  }

  planForm!: FormGroup;
  planSubscription: Subscription = new Subscription();
  plan: any = {};
  showFormLoading: Observable<boolean> | undefined;
  productList: Observable<Product[]> | undefined;
  productFilters: ProductFilter = new ProductFilter();
  recurringFilters: RecurringFilter = new RecurringFilter();
  iconClass = iconClasses;
  recurringCycle: any;


  constructor(
    private fb: FormBuilder,
    private store: Store<CoreAppState>,
    private customValidator: CustomValidationService,
    private el: ElementRef,
    private planService: PlanService,
    private toastr: ToastrService,
    private recurringService: RecurringService
  ) {
  }

  ngOnInit(): void {
    if (!this.planForm) {
      this.initializeForms()
    }
    this.showFormLoading = this.store.select(getFormLoading);
    this.store.dispatch(emptyProductsArray({filters: this.productFilters}));
    this.getProductList();
    this.getAllRecurringCycles()

  }

  getAllRecurringCycles() {
    var filter = {
      isActive : true
    }
    this.recurringService.getAllRecurrings(filter).subscribe((response: any) => {
      this.recurringCycle = response
    })
  }

  setPlanData(id: any) {
    if (id) {
      if (!this.planForm) {
        this.initializeForms()
      }
      this.planSubscription = this.store.select(getPlanById, {id}).subscribe((plan) => {
        this.plan = plan;
        this.setShipOutItemFormArray();
        this.setFeatureItemsFormArray();
        this.planForm.patchValue(this.plan);
      })
    }
  }

  initializeForms() {
    this.planForm = this.fb.group({
      planName: new FormControl(null, [Validators.required]),
      duration: new FormControl({value: '', disabled: true}, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      trialPeriod: new FormControl(null, [Validators.required]),
      recurringCycle: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      productList: this.fb.array(
        [this.createItemsFormGroup()]
      ),
      planFeatureList: this.fb.array(
        [this.createFeaturesFormGroup()]
      ),
    })
  }

  savePlan(msg: string) {
    if (!this.planForm.valid) {
      this.planForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {

      const plan: Plan = this.planForm.getRawValue();
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(addPlan({plan, msg: msg}));
    }
  }

  updatePlan() {
    if (!this.planForm.valid) {
      this.planForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      let plan = merge({}, this.plan, this.planForm.getRawValue());
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(updatePlan({plan}));
    }
  }

  createItemsFormGroup() {
    return this.fb.group({
      id: new FormControl(null),
      productId: new FormControl(null),
      planId: new FormControl(''),
      isActive: new FormControl(true),
    })
  }

  createFeaturesFormGroup() {
    return this.fb.group({
      id: new FormControl(null),
      feature: new FormControl(null),
      planId: new FormControl('',),
    })
  }

  get planItemList(): FormArray {
    return this.planForm.get('productList') as FormArray;
  }

  get featureItemList(): FormArray {
    return this.planForm.get('planFeatureList') as FormArray;
  }

  addItems() {
    let fg = this.createItemsFormGroup();
    if (this.plan.id) {
      fg.controls.planId.setValue(this.plan.id);
    }
    this.planItemList.push(fg);
  }

  addFeature() {
    let fg = this.createFeaturesFormGroup();
    if (this.plan.id) {
      fg.controls.planId.setValue(this.plan.id);
    }
    this.featureItemList.push(fg);
  }

  setProduct(i: number, event: number) {
    this.productList?.subscribe(el => {
      let selectedProduct = el[event - 1];
      this.planItemList.controls[i].get('itemName')?.setValue(selectedProduct.itemName);
      this.planItemList.controls[i].get('unitPrice')?.setValue(selectedProduct.sellingPrice);
    });

  }

  getProductList() {
    this.productList = this.store.select(getProducts);
    this.store.dispatch(loadProducts({filters: {...this.productFilters, ...{page: null, size: null, isActive: true}}}));
  }

  setShipOutItemFormArray() {
    while (this.plan.productList.length > this.planItemList.length) {
      this.addItems();
    }
    return true;
  }

  setFeatureItemsFormArray() {
    while (this.plan.planFeatureList.length > this.featureItemList.length) {
      this.addFeature();
    }
    return true;
  }

  deleteItems(idx: number) {

    if (this.planItemList.length > 1) {
      if (this.planItemList.value[idx].id) {
        this.planItemList.controls[idx].get('isActive')?.setValue(false);
      } else {
        this.planItemList.removeAt(idx);
      }
    }
  }


  deleteFeatures(idx: number) {
    if (this.featureItemList.length > 1) {
      this.featureItemList.removeAt(idx);
    }
  }


  setDuration(item: any) {
    if (item) {
      this.planForm.controls['duration'].setValue(item.noDays)
      this.planForm.controls['recurringCycle'].setValue(item.recurringCycle)
    }
  }
}
