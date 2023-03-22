import {Brand, BrandFilter} from '../../../models/brand.model';
import {createAction, props} from '@ngrx/store';
import {Plan, PlanFilter} from "../../../models/plan.model";

export const ADD_PLAN_ACTION = '[plans page] add brand';
export const ADD_PLAN_SUCCESS = '[plans page] add brand success';
export const UPDATE_PLAN_ACTION = '[plans page] update brand';
export const UPDATE_PLAN_SUCCESS = '[plans page] update brand success';
export const DELETE_PLAN_ACTION = '[plans page] delete brand';
export const DELETE_PLAN_SUCCESS = '[plans page] delete brand success';
export const LOAD_PLANS = '[plans page] load plans';
export const LOAD_PLAN_SUCCESS = '[plans page] load plans success';
export const EMPTY_PLAN_ARRAY = '[plans page] empty brand array';
export const EMPTY_PLAN_ARRAY_SUCCESS = '[plans page] empty brand array success';

export const addPlan = createAction(
  ADD_PLAN_ACTION,
  props<{ plan: Plan, msg: string }>()
);

export const addPlanSuccess = createAction(
  ADD_PLAN_SUCCESS,
  props<{ plan: Plan }>()
);

export const updatePlan = createAction(
  UPDATE_PLAN_ACTION,
  props<{ plan: Plan }>()
);

export const updatePlanSuccess = createAction(
  UPDATE_PLAN_SUCCESS,
  props<{ plan: Plan }>()
);

export const loadPlans = createAction(
  LOAD_PLANS,
  props<{ filters: PlanFilter }>()
);

export const loadPlansSuccess = createAction(
  LOAD_PLAN_SUCCESS,
  props<{ plans: Plan[] }>()
);

export const deletePlan = createAction(
  DELETE_PLAN_ACTION,
  props<{ plan: Plan }>()
);

export const deletePlanSuccess = createAction(
  DELETE_PLAN_SUCCESS,
  props<{ id: number }>()
);

export const emptyPlansArray = createAction(
  EMPTY_PLAN_ARRAY,
  props<{ filters: any }>()
);

export const emptyPlansArraySuccess = createAction(
  EMPTY_PLAN_ARRAY_SUCCESS,
  props<{ plans: Plan[] }>()
)


