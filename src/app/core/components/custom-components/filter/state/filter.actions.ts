import {createAction, props} from "@ngrx/store";

export const SET_FILTER_OPTIONS = '[filter data] set filter options';
export const SET_FILTER_OPTIONS_FIELDS = '[filter data] set filter options fields';
export const SET_SELECTED_OPTION = '[filter data] set selected options';

export const setFilterOptions = createAction(
    SET_FILTER_OPTIONS,
    props<{ filters: any }>()
);

export const setFilterOptionsFields = createAction(
    SET_FILTER_OPTIONS_FIELDS,
    props<{ filterOptionsFields: any }>()
);

export const setSelectedOption = createAction(
    SET_SELECTED_OPTION,
        props<{ selectedOption: any }>()
);
