import {Brand, BrandFilter} from '../../../models/susbcriber.model';
import {createAction, props} from '@ngrx/store';

export const ADD_SUBSCRIBER_ACTION = '[subscriber page] add subscriber';
export const ADD_SUBSCRIBER_SUCCESS = '[subscriber page] add subscriber success';
export const UPDATE_SUBSCRIBER_ACTION = '[subscriber page] update subscriber';
export const UPDATE_SUBSCRIBER_SUCCESS = '[subscriber page] update subscriber success';
export const DELETE_SUBSCRIBER_ACTION = '[subscriber page] delete subscriber';
export const DELETE_SUBSCRIBER_SUCCESS = '[subscriber page] delete subscriber success';
export const LOAD_SUBSCRIBERS = '[subscriber page] load subscriber';
export const LOAD_SUBSCRIBERS_SUCCESS = '[subscriber page] load subscriber success';
export const EMPTY_SUBSCRIBER_ARRAY = '[subscriber page] empty subscriber array';
export const EMPTY_SUBSCRIBER_ARRAY_SUCCESS = '[subscriber page] empty subscriber array success';

export const addBrand = createAction(
    ADD_SUBSCRIBER_ACTION,
    props<{ subscriber: Brand, msg: string }>()
);

export const addBrandSuccess = createAction(
    ADD_SUBSCRIBER_SUCCESS,
    props<{ subscriber: Brand }>()
);

export const updateBrand = createAction(
    UPDATE_SUBSCRIBER_ACTION,
    props<{ subscriber: Brand }>()
);

export const updateBrandSuccess = createAction(
    UPDATE_SUBSCRIBER_SUCCESS,
    props<{ subscriber: Brand }>()
);

export const loadBrands = createAction(
    LOAD_SUBSCRIBERS,
    props<{ filters: BrandFilter }>()
);

export const loadBrandsSuccess = createAction(
    LOAD_SUBSCRIBERS_SUCCESS,
    props<{ subscriber: Brand[] }>()
);

export const deleteBrand = createAction(
    DELETE_SUBSCRIBER_ACTION,
    props<{ subscriber: Brand }>()
);

export const deleteBrandSuccess = createAction(
    DELETE_SUBSCRIBER_SUCCESS,
    props<{ id: number }>()
);

export const emptyBrandsArray = createAction(
    EMPTY_SUBSCRIBER_ARRAY,
    props<{ filters: any }>()
);

export const emptyBrandsArraySuccess = createAction(
    EMPTY_SUBSCRIBER_ARRAY_SUCCESS,
    props<{ subscriber: Brand[] }>()
)


