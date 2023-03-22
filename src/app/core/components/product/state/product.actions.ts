import {createAction, props} from "@ngrx/store";
import {Product, ProductFilter} from "../../../models/product.model";
import {Brand, BrandFilter} from "../../../models/brand.model";

export const ADD_PRODUCT_ACTION = '[products page] add product';
export const ADD_PRODUCT_SUCCESS = '[products page] add product success';
export const UPDATE_PRODUCT_ACTION = '[products page] update product';
export const UPDATE_PRODUCT_SUCCESS = '[products page] update product success';
export const LOAD_PRODUCTS = '[products page] load products';
export const LOAD_PRODUCTS_SUCCESS = '[products page] load products success';
export const DELETE_PRODUCT_ACTION = '[products page] delete product';
export const DELETE_PRODUCT_SUCCESS = '[products page] delete product success';
export const EMPTY_PRODUCT_ARRAY = '[products page] empty product array';
export const EMPTY_PRODUCT_ARRAY_SUCCESS = '[products page] empty product array success';
export const LOAD_ALL_BRANDS = '[brands page] load brands';
export const LOAD_ALL_BRANDS_SUCCESS = '[brands page] load brands success';

export const addProduct = createAction(
    ADD_PRODUCT_ACTION,
    props<{ product: Product, msg: string }>()
);

export const addProductSuccess = createAction(
    ADD_PRODUCT_SUCCESS,
    props<{ product: Product }>()
);

export const updateProduct = createAction(
    UPDATE_PRODUCT_ACTION,
    props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
    UPDATE_PRODUCT_SUCCESS,
    props<{ product: Product }>()
);

export const loadProducts = createAction(
    LOAD_PRODUCTS,
    props<{ filters: ProductFilter }>()
);

export const loadProductsSuccess = createAction(
    LOAD_PRODUCTS_SUCCESS,
    props<{ products: Product[] }>()
)

export const deleteProduct = createAction(
    DELETE_PRODUCT_ACTION,
    props<{ product: Product }>()
);

export const deleteProductSuccess = createAction(
    DELETE_PRODUCT_SUCCESS,
    props<{ id: number }>()
);

export const emptyProductsArray = createAction(
    EMPTY_PRODUCT_ARRAY,
    props<{ filters: any }>()
);

export const emptyProductsArraySuccess = createAction(
    EMPTY_PRODUCT_ARRAY_SUCCESS,
    props<{ products: Product[] }>()
)

// export const loadAllBrands = createAction(
//   LOAD_ALL_BRANDS,
//   props<{ filters: BrandFilter }>()
// );

export const loadAllBrandsSuccess = createAction(
  LOAD_ALL_BRANDS_SUCCESS,
  props<{ brands: Brand[] }>()
);
