import {createAction, props} from "@ngrx/store";
import {Customer, CustomerFilter} from "../../../models/customer.model";

export const ADD_CUSTOMER_ACTION = '[customers page] add customer';
export const ADD_CUSTOMER_SUCCESS = '[customers page] add customer success';
export const UPDATE_CUSTOMER_ACTION = '[customers page] update customer';
export const UPDATE_CUSTOMER_SUCCESS = '[customers page] update customer success';
export const LOAD_CUSTOMERS = '[customers page] load customers';
export const LOAD_CUSTOMERS_SUCCESS = '[customers page] load customers success';
export const DELETE_CUSTOMER_ACTION = '[customers page] delete customer';
export const DELETE_CUSTOMER_SUCCESS = '[customers page] delete customer success';
export const EMPTY_CUSTOMER_ARRAY = '[customers page] empty customer array';
export const EMPTY_CUSTOMER_ARRAY_SUCCESS = '[customers page] empty customer array success';

export const addCustomer = createAction(
    ADD_CUSTOMER_ACTION,
    props<{ customer: Customer, msg: string }>()
);

export const addCustomerSuccess = createAction(
    ADD_CUSTOMER_SUCCESS,
    props<{ customer: Customer }>()
);

export const updateCustomer = createAction(
    UPDATE_CUSTOMER_ACTION,
    props<{ customer: Customer }>()
);

export const updateCustomerSuccess = createAction(
    UPDATE_CUSTOMER_SUCCESS,
    props<{ customer: Customer }>()
);

export const loadCustomers = createAction(
    LOAD_CUSTOMERS,
    props<{ filters: CustomerFilter }>()
);

export const loadCustomersSuccess = createAction(
    LOAD_CUSTOMERS_SUCCESS,
    props<{ customers: Customer[] }>()
)

export const deleteCustomer = createAction(
    DELETE_CUSTOMER_ACTION,
    props<{ id: number }>()
);

export const deleteCustomerSuccess = createAction(
    DELETE_CUSTOMER_SUCCESS,
    props<{ id: number }>()
);

export const emptyCustomersArray = createAction(
    EMPTY_CUSTOMER_ARRAY,
    props<{ filters: any }>()
);

export const emptyCustomersArraySuccess = createAction(
    EMPTY_CUSTOMER_ARRAY_SUCCESS,
    props<{ customers: Customer[] }>()
)
