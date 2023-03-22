import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SharedState} from "./shared.state";

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state) => {
    return state.showLoading;
})

export const getFormLoading = createSelector(getSharedState, (state) => {
    return state.showFormLoading;
})

export const getModal = createSelector(getSharedState, (state) => {
    return state.showModal;
})

export const getModal2 = createSelector(getSharedState, (state) => {
    return state.showModal2;
})

export const getErrorMessage = createSelector(getSharedState, (state) => {
    return state.errorMessage;
})
