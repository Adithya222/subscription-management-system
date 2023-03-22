import {createReducer, on} from "@ngrx/store";
import {initialState} from "./product.state";
import {addProductSuccess, deleteProductSuccess, emptyProductsArraySuccess, loadAllBrandsSuccess, loadProductsSuccess, updateProductSuccess} from "./product.actions";
import {emptyCustomersArraySuccess} from "../../customer/state/customer.actions";

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {

    const newArray = [...state.products, ...action.products];
    return {...state, products: newArray}
    // return {...state, products: action.products}
    // return {...state, products: [...state.products, ...action.products]}
  }),
  on(addProductSuccess, (state, action) => {
    let product = {...action.product}
    return {...state, products: [...state.products, product]}
  }),
  on(updateProductSuccess, (state, action) => {
    const updatedProducts = state.products.map((product) => {
      return action.product.id === product.id ? action.product : product;
    });
    return {...state, products: updatedProducts};
    // return merge({}, state, {products: updatedProducts});
  }),
  on(deleteProductSuccess, (state, {id}) => {
    const updatedProducts = state.products.filter((product) => {
      return product.id !== id;
    });
    return {...state, products: updatedProducts};
  }),
  on(emptyProductsArraySuccess, (state, action) => {

    return {...state, products: []}
  })
  // on(loadAllBrandsSuccess, (state, action) => {
  //   return {...state, allBrands: action.brands}
  // }),
)


export function productReducer(state: any, action: any) {
    return _productReducer(state, action);
}
