import {Customer} from "../../../models/customer.model";

export interface CustomerState {
  customers: Customer[];
}

export const  initialState: CustomerState = {
  customers: []
};
