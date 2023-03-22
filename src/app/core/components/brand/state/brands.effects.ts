import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {addBrand, addBrandSuccess, deleteBrand, deleteBrandSuccess, emptyBrandsArray, emptyBrandsArraySuccess, loadBrands, loadBrandsSuccess, updateBrand, updateBrandSuccess} from "./brands.actions";
import {map, mergeMap, of, switchMap} from "rxjs";
import {setErrorMsg, setFormLoading, setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {catchError} from "rxjs/operators";
import {Brand} from "../../../models/brand.model";
import {ToastrService} from "ngx-toastr";
import {BrandService} from "../../../services/brand.service";
import {HelperService} from "../../../services/helper.service";

@Injectable()
export class BrandsEffects {
  constructor(
    private actions$: Actions,
    private brandService: BrandService,
    private store: Store<CoreAppState>,
    private toastr: ToastrService,
    private helperService: HelperService,
  ) {
  }

  loadBrands$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBrands),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}))
        return this.brandService.getBrands(action.filters).pipe(
          map((brands) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return loadBrandsSuccess({brands});
          }),
          catchError((err: any) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return of(setErrorMsg({message: err.message}));
          })
        );
      })
    )
  })

  emptyBrandsArray$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emptyBrandsArray),
      mergeMap((action) => {
        const brands: Brand[] = [];
        return of(emptyBrandsArraySuccess({brands}));
      })
    )
  })

  addBrand$ = createEffect(() => {
    return this.actions$.pipe(ofType(addBrand), mergeMap((action) => {
      return this.brandService.addBrand(action.brand).pipe(
        map((data) => {
          const brand = {...action.brand, ...data.data.data};
          this.toastr.success(data.message);
          action.msg == 'close' ? this.store.dispatch(setModalStatus({status: false})) : null;
          return addBrandSuccess({brand});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          return of(err.message);
        })
      );
    }));
  })

  updateBrand$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateBrand), switchMap((action) => {
      return this.brandService.updateBrand(action.brand).pipe(
        map((data) => {
          this.toastr.success(data.message, 'Success');
          this.store.dispatch(setFormLoading({status: false}));
          this.store.dispatch(setModalStatus({status: false}))
          this.store.dispatch(setLoadingSpinner({status: false}))
          return updateBrandSuccess({brand: action.brand});
        }),
        catchError((err: any) => {
          this.toastr.error(err.message, 'Error');
          this.store.dispatch(setModalStatus({status: false}))
          this.store.dispatch(setFormLoading({status: false}));
          this.store.dispatch(setLoadingSpinner({status: false}))
          return of(err.message);
        })
      );
    }))
  })

  deleteBrand$ = createEffect(() => {
    return this.actions$.pipe(ofType(deleteBrand), switchMap((action) => {
      return this.brandService.deleteBrand(action.brand).pipe(
        map((data) => {
          this.store.dispatch(setLoadingSpinner({status: false}));
          this.toastr.success('Brand deleted');
          return deleteBrandSuccess({id: action.brand.id});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          this.store.dispatch(setLoadingSpinner({status: false}));
          return of(err.message);
        }),
      );
    }))
  })

}
