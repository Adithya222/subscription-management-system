import {Company} from "../../../models/company.model";

export interface CompanyState {
  companies: Company[];
}

export const  initialState: CompanyState = {
  companies: [],
};
