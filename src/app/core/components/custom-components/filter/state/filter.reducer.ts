import {createReducer, on} from "@ngrx/store";
import {initialState} from "./filter.state";
import {setFilterOptions, setFilterOptionsFields, setSelectedOption} from "./filter.actions";

const _filterReducer = createReducer(
    initialState,
    on(setFilterOptions, (state, action) => {
        return {
            ...state,
            filterOptions: action.filters,
        }
    }),
    on(setFilterOptionsFields, (state, action) => {
        return {
            ...state,
            filterOptionsFields: action.filterOptionsFields,
        }
    }),
    on(setSelectedOption, (state, action) => {
        return {
            ...state,
            selectedOption: action.selectedOption,
        }
    })
)

export function FilterReducer(state: any, action: any) {
    return _filterReducer(state, action)
}
