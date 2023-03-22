import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CustomerState} from "./customer.state";

export const CUSTOMER_STATE_NAME = 'customers';
const getCustomerState = createFeatureSelector<CustomerState>(CUSTOMER_STATE_NAME);

export const getCustomers = createSelector(getCustomerState, (state) => {
  return state.customers;
});
// export const getCustomerEntities = createSelector(getCustomerState, customerSelectors.selectEntities);
//empty customer list
// export const removeCustomers = createSelector(getCustomerState, customerAdapter.removeAll);

export const getCustomerById = createSelector(getCustomerState, (state: any, props: any) => {
  return state.customers.find((customer: any) => customer.id === props.id);
})
