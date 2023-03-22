import {Plan} from "../../../models/plan.model";

export interface PlanState {
  plans: Plan[];
}

export const  initialState: PlanState = {
  plans: [],
};
