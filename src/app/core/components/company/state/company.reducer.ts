import {createReducer, on} from "@ngrx/store";
import {initialState} from "./company.state";
import {addCompanySuccess, deleteCompanySuccess, loadCompaniesSuccess, updateCompanySuccess} from "./company.actions";

const _companyReducer = createReducer(
  initialState,
  on(loadCompaniesSuccess, (state, action) => {
    return {...state, companies: action.companies}
  }),

  on(addCompanySuccess, (state, action) => {
    let company = {...action.company}
    return {...state, companies: [...state.companies, company]}
  }),
  on(updateCompanySuccess, (state, action) => {
    const updatedCompanies = state.companies.map((company) => {
      return action.company.id === company.id ? action.company : company;
    });
    return {...state, companies: updatedCompanies};
    // return merge({}, state, {brands: updatedBrands});
  }),
  on(deleteCompanySuccess, (state, {id}) => {
    const updatedCompanies = state.companies.filter((company) => {
      return company.id !== id;
    });
    return {...state, companies: updatedCompanies};
  }),
);

export function companyReducer(state: any, action: any) {
    return _companyReducer(state, action);
}
