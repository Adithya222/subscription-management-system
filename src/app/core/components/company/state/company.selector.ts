import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CompanyState} from "./company.state";

export const COMPANY_STATE_NAME = 'companies';

const getCompanyState = createFeatureSelector<CompanyState>(COMPANY_STATE_NAME);

export const getCompany = createSelector(getCompanyState, (state) => {
  return state.companies;
});

// export const getBrandEntities = createSelector(getBrandsState, brandSelectors.selectEntities);
// export const removeBrands = createSelector(getBrandsState, brandAdapter.removeAll);

/*
* this method can use when use @input to pass the parameters
* */
export const getCompanyById = createSelector(getCompanyState, (state: any, props: any) => {
    return state.companies.find((company: any) => company.id === props.id);
})

// /*
// * this method can use for when parameters pass with the url
// * */
// export const getBrandById = createSelector(getBrands, getCurrentRoute, (brands, route: RouterStateUrl) => {
//     return brands ? brands.find((brand) => brand.id === route.params['id']): null;
// })
