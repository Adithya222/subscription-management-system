import {createReducer, on} from "@ngrx/store";
import {initialState} from "./plan.state";
import {
  addPlanSuccess,
  deletePlanSuccess,
  loadPlansSuccess,
  updatePlanSuccess
} from "./plan.actions";

const _palnReducer = createReducer(
  initialState,
  on(loadPlansSuccess, (state, action) => {

    const newArray = [...state.plans, ...action.plans];
    return {...state, plans: newArray}
    // return {...state, plans: action.plans}
  }),

  on(addPlanSuccess, (state, action) => {
    let plan = {...action.plan}
    return {...state, plans: [...state.plans, plan]}
  }),
  on(updatePlanSuccess, (state, action) => {
    const updatedPlans = state.plans.map((plan) => {
      return action.plan.id === plan.id ? action.plan : plan;
    });
    return {...state, plans: updatedPlans};
  }),
  on(deletePlanSuccess, (state, {id}) => {
    const updatedPlans = state.plans.filter((plan) => {
      return plan.id !== id;
    });
    return {...state, plans: updatedPlans};
  }),
);

export function planReducer(state: any, action: any) {
    return _palnReducer(state, action);
}
