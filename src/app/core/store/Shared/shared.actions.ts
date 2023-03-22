import {createAction, props} from "@ngrx/store";
import {AddNewItem} from "../../models/add-new-item.model";

export const SET_LOADING_SPINNER_ACTION = '[shared state] set loading spinner';
export const SET_FORM_LOADING_ACTION = '[shared state] set form loading';
export const SET_MODAL_STATUS_ACTION = '[shared state] set modal status';
export const SET_MODAL2_STATUS_ACTION = '[shared state] set second modal status';
export const SET_ERROR_MSG_ACTION = '[shared state] set error message';

export const dummyAction = createAction('[dummy action]');
export const setLoadingSpinner = createAction(
    SET_LOADING_SPINNER_ACTION,
    props<{ status: boolean }>()
);
export const setFormLoading = createAction(
    SET_FORM_LOADING_ACTION,
    props<{ status: boolean }>()
);
export const setModalStatus = createAction(
    SET_MODAL_STATUS_ACTION,
    props<{ status: boolean }>()
);
export const setModal2Status = createAction(
    SET_MODAL2_STATUS_ACTION,
    props<{ addNewItem: AddNewItem }>()
);
export const setErrorMsg = createAction(
    SET_ERROR_MSG_ACTION,
    props<{ message: string }>()
);
