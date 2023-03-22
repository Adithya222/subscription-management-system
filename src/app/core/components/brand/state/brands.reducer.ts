import {createReducer, on} from "@ngrx/store";
import {initialState} from "./brands.state";
import {addBrandSuccess, deleteBrandSuccess, loadBrandsSuccess, updateBrandSuccess} from "./brands.actions";

const _brandsReducer = createReducer(
  initialState,
  on(loadBrandsSuccess, (state, action) => {

    const newArray = [...state.brands, ...action.brands];
    return {...state, brands: newArray}
    // return {...state, brands: action.brands}
  }),

  on(addBrandSuccess, (state, action) => {
    let brand = {...action.brand}
    return {...state, brands: [...state.brands, brand]}
  }),
  on(updateBrandSuccess, (state, action) => {
    const updatedBrands = state.brands.map((brand) => {
      return action.brand.id === brand.id ? action.brand : brand;
    });
    return {...state, brands: updatedBrands};
    // return merge({}, state, {brands: updatedBrands});
  }),
  on(deleteBrandSuccess, (state, {id}) => {
    const updatedBrands = state.brands.filter((brand) => {
      return brand.id !== id;
    });
    return {...state, brands: updatedBrands};
  }),
);

export function brandsReducer(state: any, action: any) {
    return _brandsReducer(state, action);
}
