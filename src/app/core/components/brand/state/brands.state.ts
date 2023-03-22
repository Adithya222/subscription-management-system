import {Brand} from "../../../models/brand.model";

export interface BrandsState {
  brands: Brand[];
}

export const  initialState: BrandsState = {
  brands: [],
};
