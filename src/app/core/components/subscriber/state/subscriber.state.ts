import {Brand} from "../../../models/brand.model";

export interface SubscriberState {
  brands: Brand[];
}

export const  initialState: SubscriberState = {
  brands: [],
};
