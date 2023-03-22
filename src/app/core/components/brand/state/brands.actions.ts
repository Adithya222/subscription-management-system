import {Brand, BrandFilter} from '../../../models/brand.model';
import {createAction, props} from '@ngrx/store';

export const ADD_BRAND_ACTION = '[brands page] add brand';
export const ADD_BRAND_SUCCESS = '[brands page] add brand success';
export const UPDATE_BRAND_ACTION = '[brands page] update brand';
export const UPDATE_BRAND_SUCCESS = '[brands page] update brand success';
export const DELETE_BRAND_ACTION = '[brands page] delete brand';
export const DELETE_BRAND_SUCCESS = '[brands page] delete brand success';
export const LOAD_BRANDS = '[brands page] load brands';
export const LOAD_BRANDS_SUCCESS = '[brands page] load brands success';
export const EMPTY_BRAND_ARRAY = '[brands page] empty brand array';
export const EMPTY_PRODUCT_ARRAY_SUCCESS = '[brands page] empty brand array success';

export const addBrand = createAction(
    ADD_BRAND_ACTION,
    props<{ brand: Brand, msg: string }>()
);

export const addBrandSuccess = createAction(
    ADD_BRAND_SUCCESS,
    props<{ brand: Brand }>()
);

export const updateBrand = createAction(
    UPDATE_BRAND_ACTION,
    props<{ brand: Brand }>()
);

export const updateBrandSuccess = createAction(
    UPDATE_BRAND_SUCCESS,
    props<{ brand: Brand }>()
);

export const loadBrands = createAction(
    LOAD_BRANDS,
    props<{ filters: BrandFilter }>()
);

export const loadBrandsSuccess = createAction(
    LOAD_BRANDS_SUCCESS,
    props<{ brands: Brand[] }>()
);

export const deleteBrand = createAction(
    DELETE_BRAND_ACTION,
    props<{ brand: Brand }>()
);

export const deleteBrandSuccess = createAction(
    DELETE_BRAND_SUCCESS,
    props<{ id: number }>()
);

export const emptyBrandsArray = createAction(
    EMPTY_BRAND_ARRAY,
    props<{ filters: any }>()
);

export const emptyBrandsArraySuccess = createAction(
    EMPTY_PRODUCT_ARRAY_SUCCESS,
    props<{ brands: Brand[] }>()
)


