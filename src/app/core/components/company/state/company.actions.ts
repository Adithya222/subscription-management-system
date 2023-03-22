import {createAction, props} from '@ngrx/store';
import {Company, CompanyFilter} from "../../../models/company.model";

export const ADD_COMPANY_ACTION = '[company page] add company';
export const ADD_COMPANY_SUCCESS = '[company page] add company success';
export const UPDATE_COMPANY_ACTION = '[company page] update company';
export const UPDATE_COMPANY_SUCCESS = '[company page] update company success';
export const DELETE_COMPANY_ACTION = '[company page] delete company';
export const DELETE_COMPANY_SUCCESS = '[company page] delete company success';
export const LOAD_COMPANY = '[company page] load company';
export const LOAD_COMPANY_SUCCESS = '[company page] load company success';
export const EMPTY_COMPANY_ARRAY = '[company page] empty company array';
export const EMPTY_COMPANY_ARRAY_SUCCESS = '[company page] empty company array success';

export const addCompany = createAction(
  ADD_COMPANY_ACTION,
    props<{ company: Company, msg: string }>()
);

export const addCompanySuccess = createAction(
  ADD_COMPANY_SUCCESS,
    props<{ company: Company }>()
);

export const updateCompany = createAction(
  UPDATE_COMPANY_ACTION,
    props<{ company: Company }>()
);

export const updateCompanySuccess = createAction(
  UPDATE_COMPANY_SUCCESS,
    props<{ company: Company }>()
);

export const loadCompanies = createAction(
  LOAD_COMPANY,
    props<{ filters: CompanyFilter }>()
);

export const loadCompaniesSuccess = createAction(
  LOAD_COMPANY_SUCCESS,
    props<{ companies: Company[] }>()
);

export const deleteCompany = createAction(
  DELETE_COMPANY_ACTION,
    props<{ company: Company }>()
);

export const deleteCompanySuccess = createAction(
  DELETE_COMPANY_SUCCESS,
    props<{ id: number }>()
);

export const emptyCompanyArray = createAction(
  EMPTY_COMPANY_ARRAY,
    props<{ filters: any }>()
);

export const emptyCompaniesArraySuccess = createAction(
  EMPTY_COMPANY_ARRAY_SUCCESS,
    props<{ companies: Company[] }>()
)


