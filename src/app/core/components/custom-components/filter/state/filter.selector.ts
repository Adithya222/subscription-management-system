import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FilterState} from "./filter.state";

export const FILTERED_STATE_NAME = 'filter';
export const FILTERED_FIELDS_STATE_NAME = 'filter';
export const SELECTED_OPTION_STATE_NAME = 'filter';

const getFilteredState = createFeatureSelector<FilterState>(FILTERED_STATE_NAME);
const getFilteredFieldState = createFeatureSelector<FilterState>(FILTERED_FIELDS_STATE_NAME);
const getSelectedOptionState = createFeatureSelector<FilterState>(SELECTED_OPTION_STATE_NAME);

export const getFilterOptions = createSelector(getFilteredState, (state) => {
    return state.filterOptions
})

export const getFilterOptionsFields = createSelector(getFilteredFieldState, (state) => {
    return state.filterOptionsFields
})

export const getSelectedOption = createSelector(getSelectedOptionState, (state) => {
    return state.selectedOption
})
