import {Product} from "../../../models/product.model";

export interface ProductState {
  products: Product[];
}

export const initialState: ProductState = {
  products: [],
};

