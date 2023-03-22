import {PRODUCT_STATE_NAME} from "../components/product/state/product.selector";
import {ProductState} from "../components/product/state/product.state";
import {BRAND_STATE_NAME} from "../components/brand/state/brands.selector";
import {BrandsState} from "../components/brand/state/brands.state";
import {productReducer} from "../components/product/state/product.reducer";
import {brandsReducer} from "../components/brand/state/brands.reducer";
import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";

export interface CoreProductState {
  [PRODUCT_STATE_NAME]: ProductState;
  [BRAND_STATE_NAME]: BrandsState;
}

export const coreProductReducer: ActionReducerMap<CoreProductState> = {
  [PRODUCT_STATE_NAME]: productReducer,
  [BRAND_STATE_NAME]: brandsReducer
}

export const getProductsState = createFeatureSelector<CoreProductState>(
  'products'
)
