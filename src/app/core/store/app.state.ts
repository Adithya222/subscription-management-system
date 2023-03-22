import {SHARED_STATE_NAME} from "./Shared/shared.selector";
import {SharedState} from "./Shared/shared.state";
import {SharedReducer} from "./Shared/shared.reducer";
import {routerReducer, RouterReducerState} from "@ngrx/router-store";
import {FilterState} from "../components/custom-components/filter/state/filter.state";
import {FILTERED_STATE_NAME} from "../components/custom-components/filter/state/filter.selector";
import {FilterReducer} from "../components/custom-components/filter/state/filter.reducer";

export interface CoreAppState {
    [SHARED_STATE_NAME]: SharedState;
    [FILTERED_STATE_NAME]: FilterState;
    router: RouterReducerState;
}

export const appReducer = {
    [SHARED_STATE_NAME]: SharedReducer,
    [FILTERED_STATE_NAME]: FilterReducer,
    router: routerReducer
}
