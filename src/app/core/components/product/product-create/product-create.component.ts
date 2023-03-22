import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {addProduct, updateProduct} from "../state/product.actions";
import {getProductById} from "../state/product.selector";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {Observable, Subscription} from "rxjs";
import {getFormLoading} from "../../../store/Shared/shared.selector";
import {setFormLoading, setModal2Status, setModalStatus} from "../../../store/Shared/shared.actions";
import {CustomValidationService} from "../../../services/customvalidation.service";
import {ToastrService} from "ngx-toastr";
import {Brand, BrandFilter} from "../../../models/brand.model";
import {merge} from "lodash";
import {getBrands} from "../../brand/state/brands.selector";
import {emptyBrandsArray, loadBrands} from "../../brand/state/brands.actions";
import {PlanFilter} from "../../../models/plan.model";
import {BrandService} from "../../../services/brand.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  @Input()
  set productId(productId: any) {
    this.setProductData(productId);
  }

  productForm!: FormGroup;
  product: any = {};
  selectedId: any;
  productSubscription: Subscription = new Subscription();
  showFormLoading: Observable<boolean> | undefined;
  brandList: Observable<Brand[]> | undefined;
  brands :any
  brandFilters: BrandFilter = new BrandFilter();
  // filters: PlanFilter = new PlanFilter();


  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private el: ElementRef,
    private store: Store<CoreAppState>,
    private toast: ToastrService,
    private brandService: BrandService
  ) {
  }

  ngOnInit(): void {
    if (!this.productForm) {
      this.initializeForms()
    }
    this.showFormLoading = this.store.select(getFormLoading);
    this.getBrandList();

  }

  initializeForms() {
    this.productForm = this.fb.group({
      itemName: new FormControl('', Validators.required),
      itemCode: new FormControl('', Validators.required),
      brandId: new FormControl('', Validators.required),
      productImage: new FormControl(''),
      // sellingPrice: new FormControl(''),
      description: new FormControl(''),
      isActive: new FormControl(true),
    });
  }

  getBrandList() {

    var filter = {
      isActive : true
    }
    this.brandService.getAllBrands(filter).subscribe((response:any) => {
      this.brands = response
    })


  }

  saveProduct(msg: string) {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      const product: Product = this.productForm.value;
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(addProduct({product, msg: msg}));
    }
  }

  setProductData(id: any) {
    if (id) {
      if (!this.productForm) {
        this.initializeForms()
      }
      this.productSubscription = this.store.select(getProductById, {id}).subscribe((data) => {
        this.product = data;
        this.productForm.patchValue(this.product);
      })
    }
  }

  updateProduct() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      this.customValidator.scrollToFirstInvalidControl(this.el);
    } else {
      let product = merge({}, this.product, this.productForm.value);
      this.store.dispatch(setFormLoading({status: true}));
      this.store.dispatch(updateProduct({product}));
    }
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  addNewItem(component = '') {
    this.store.dispatch(setModal2Status({addNewItem: {component: component, status: true}}));
  }

  clear() {
    this.productForm.reset();
    this.product = {};
  }
}
