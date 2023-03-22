import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {filter, map, mergeMap, of, switchMap, withLatestFrom} from "rxjs";
import {loadProducts, loadProductsSuccess, addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, updateProduct, updateProductSuccess, emptyProductsArray, emptyProductsArraySuccess} from "./product.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {dummyAction, setErrorMsg, setFormLoading, setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {catchError} from "rxjs/operators";
import {ROUTER_NAVIGATION, RouterNavigatedAction} from "@ngrx/router-store";
import {Product} from "../../../models/product.model";
import {getProducts} from "./product.selector";
import {ProductService} from "../../../services/product.service";
import {ToastrService} from "ngx-toastr";
import {BrandService} from "../../../services/brand.service";


@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<CoreAppState>,
    private toastr: ToastrService,
    private brandService: BrandService,
  ) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}))
        return this.productService.getProducts(action.filters).pipe(
          map((products) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return loadProductsSuccess({products});
          }),
          catchError((err: any) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return of(setErrorMsg({message: err.message}));
          })
        );
      })
    )
  })


  // loadAllBrands$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loadAllBrands),
  //     mergeMap((action) => {
  //       this.store.dispatch(setLoadingSpinner({status: true}))
  //       return this.brandService.getAllBrands({}).pipe(
  //         map((brands) => {
  //           this.store.dispatch(setLoadingSpinner({status: false}))
  //           return loadAllBrandsSuccess({brands});
  //         }),
  //         catchError((err: any) => {
  //           this.store.dispatch(setLoadingSpinner({status: false}))
  //           return of(setErrorMsg({message: err.message}));
  //         })
  //       );
  //     })
  //   )
  // })

  emptyProductsArray$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emptyProductsArray),
      mergeMap((action) => {
        const products: Product[] = [];
        return of(emptyProductsArraySuccess({products}));
      })
    )
  })

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(ofType(addProduct), mergeMap((action) => {
      return this.productService.addProduct(action.product).pipe(
        map((data) => {
          const product = {...action.product, ...data.data.data};
          this.toastr.success(data.message);
          this.store.dispatch(setFormLoading({status: false}));
          action.msg == 'close' ? this.store.dispatch(setModalStatus({status: false})) : null;
          return addProductSuccess({product});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          this.store.dispatch(setFormLoading({status: false}));
          return of(err.message);
        })
      );
    }));
  })

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateProduct), switchMap((action) => {
      return this.productService.updateProduct(action.product).pipe(
        map((data) => {
          this.toastr.success(data.message, 'Success');
          this.store.dispatch(setFormLoading({status: false}));
          this.store.dispatch(setModalStatus({status: false}))
          this.store.dispatch(setLoadingSpinner({status: false}))
          return updateProductSuccess({product: action.product});
        }),
        catchError((err: any) => {
          this.toastr.error(err.message, 'Error');
          this.store.dispatch(setModalStatus({status: false}))
          this.store.dispatch(setLoadingSpinner({status: false}))
          this.store.dispatch(setFormLoading({status: false}));
          return of(err.message);
        })
      );
    }))
  })

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(ofType(deleteProduct), switchMap((action: any) => {
      return this.productService.deleteProduct(action.product).pipe(
        map((data) => {
          this.toastr.success('Product deleted');
          this.store.dispatch(setLoadingSpinner({status: false}));
          return deleteProductSuccess({id: action.product.id});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          this.store.dispatch(setLoadingSpinner({status: false}));
          return of(err.message);
        }),
      );
    }))
  });

  //load product details when open with new page or window
  getSinglePost = createEffect(() => {
    return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/products/details');
      }),
      map((r: any) => {
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getProducts)),
      switchMap(([id, products]) => {
        if (!products.length) {
          return this.productService.getProductById(id).pipe(map((product) => {
            const productData = [{...product, id}];
            return loadProductsSuccess({products: productData});
          }))
        }
        return of(dummyAction());
      })
    )
  })

}
