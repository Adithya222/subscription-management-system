import {createReducer, on} from "@ngrx/store";
import {merge} from "lodash";
import {initialState} from "./customer.state";
import {addCustomerSuccess, deleteCustomerSuccess, emptyCustomersArraySuccess, loadCustomersSuccess, updateCustomerSuccess} from "./customer.actions";

const _customersReducer = createReducer(
  initialState,
  on(loadCustomersSuccess, (state, action) => {
    // return {...state, customers: action.customers}
    return {...state, customers: [...state.customers, ...action.customers]}
  }),
  on(addCustomerSuccess, (state, action) => {
    let customer = {...action.customer}
    return {...state, customers: [...state.customers, customer]}
  }),
  on(updateCustomerSuccess, (state, action) => {
    const updatedCustomers = state.customers.map((customer) => {
      return action.customer.id === customer.id ? action.customer : customer;
    });
    return {...state, customers: updatedCustomers};
    // return merge({}, state, {customers: updatedCustomers});
  }),
  on(deleteCustomerSuccess, (state, {id}) => {
    const updatedCustomers = state.customers.filter((customer) => {
      return customer.id !== id;
    });
    return {...state, customers: updatedCustomers};
  }),
  on(emptyCustomersArraySuccess, (state, action) => {
    return {...state, customers: []}
  })
);

export function customersReducer(state: any, action: any) {
  return _customersReducer(state, action);
}
