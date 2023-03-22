import {createReducer, on} from "@ngrx/store";
import {initialState} from "./shared.state";
import {setErrorMsg, setFormLoading, setLoadingSpinner, setModal2Status, setModalStatus} from "./shared.actions";

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    }
  }),
  on(setFormLoading, (state, action) => {
    return {
      ...state,
      showFormLoading: action.status,
    }
  }),
  on(setModalStatus, (state, action) => {
    return {
      ...state,
      showModal: action.status,
    }
  }),
  on(setModal2Status, (state, action) => {
    return {
      ...state,
      showModal2: action.addNewItem,
    }
  }),
  on(setErrorMsg, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    }
  })
)

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action)
}
