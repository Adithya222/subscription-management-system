import {AddNewItem} from "../../models/add-new-item.model";

export interface SharedState {
    showLoading: boolean;
    showFormLoading: boolean;
    showModal: boolean;
    showModal2: AddNewItem;
    errorMessage: string;
}

export const initialState: SharedState = {
    showLoading: false,
    showFormLoading: false,
    showModal: false,
    showModal2: {
      component: '',
      status: false,
    },
    errorMessage: '',
}
