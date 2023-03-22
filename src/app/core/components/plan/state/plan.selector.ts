import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PlanState} from "./plan.state";

export const PLAN_STATE_NAME = 'plans';

const getPlanState = createFeatureSelector<PlanState>(PLAN_STATE_NAME);

export const getPlans = createSelector(getPlanState, (state) => {
  return state.plans;
});

// export const getBrandEntities = createSelector(getBrandsState, brandSelectors.selectEntities);
// export const removeBrands = createSelector(getBrandsState, brandAdapter.removeAll);

/*
* this method can use when use @input to pass the parameters
* */
export const getPlanById = createSelector(getPlanState, (state: any, props: any) => {
    return state.plans.find((plan: any) => plan.id === props.id);
})

// /*
// * this method can use for when parameters pass with the url
// * */
// export const getBrandById = createSelector(getBrands, getCurrentRoute, (brands, route: RouterStateUrl) => {
//     return brands ? brands.find((brand) => brand.id === route.params['id']): null;
// })
