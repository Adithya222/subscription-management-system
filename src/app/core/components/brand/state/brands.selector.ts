import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BrandsState} from "./brands.state";

export const BRAND_STATE_NAME = 'brands';

const getBrandState = createFeatureSelector<BrandsState>(BRAND_STATE_NAME);

export const getBrands = createSelector(getBrandState, (state) => {
  return state.brands;
});

// export const getBrandEntities = createSelector(getBrandsState, brandSelectors.selectEntities);
// export const removeBrands = createSelector(getBrandsState, brandAdapter.removeAll);

/*
* this method can use when use @input to pass the parameters
* */
export const getBrandById = createSelector(getBrandState, (state: any, props: any) => {
    return state.brands.find((brand: any) => brand.id === props.id);
})

// /*
// * this method can use for when parameters pass with the url
// * */
// export const getBrandById = createSelector(getBrands, getCurrentRoute, (brands, route: RouterStateUrl) => {
//     return brands ? brands.find((brand) => brand.id === route.params['id']): null;
// })
