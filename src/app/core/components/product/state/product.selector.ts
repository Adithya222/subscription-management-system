import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ProductState} from "./product.state";

export const PRODUCT_STATE_NAME = 'products';
const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);

export const getProducts = createSelector(getProductState, (state) => {
  return state.products;
});

// export const getAllBrands = createSelector(getProductState, (state) => {
//   return state.allBrands;
// });

/*
* this method can use for when use @Input
* */
export const getProductById = createSelector(getProductState, (state: any, props: any) => {
    return state.products.find((product: any) => product.id === props.id);
})

/*
* this method can use for when parameters pass with the url
* */
// export const getProductById = createSelector(productSelectors.selectEntities, getCurrentRoute, (products, route: RouterStateUrl) => {
//     return products ? products[route.params['id']]: null;
// })
