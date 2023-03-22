import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap, of, switchMap} from "rxjs";
import {setErrorMsg, setFormLoading, setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../../services/helper.service";
import {CompanyService} from "../../../services/company.service";
import {
  addCompany,
  addCompanySuccess, deleteCompany, deleteCompanySuccess, emptyCompaniesArraySuccess,
  emptyCompanyArray,
  loadCompanies,
  loadCompaniesSuccess,
  updateCompany, updateCompanySuccess
} from "./company.actions";
import {emptyBrandsArraySuccess} from "../../brand/state/brands.actions";
import {Company} from "../../../models/company.model";

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyService,
    private store: Store<CoreAppState>,
    private toastr: ToastrService,
    private helperService: HelperService,
  ) {
  }

  loadCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCompanies),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}))
        return this.companyService.getCompanies(action.filters).pipe(
          map((companies) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return loadCompaniesSuccess({companies});
          }),
          catchError((err: any) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return of(setErrorMsg({message: err.message}));
          })
        );
      })
    )
  })

  emptyCompaniesArray$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emptyCompanyArray),
      mergeMap((action) => {
        const companies: Company[] = [];
        return of(emptyCompaniesArraySuccess({companies}));
      })
    )
  })

  addCompany$ = createEffect(() => {
    return this.actions$.pipe(ofType(addCompany), mergeMap((action) => {
      return this.companyService.addCompany(action.company).pipe(
        map((data) => {
          const company = {...action.company, ...data.data.data};
          this.toastr.success(data.message);
          action.msg == 'close' ? this.store.dispatch(setModalStatus({status: false})) : null;
          return addCompanySuccess({company});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          return of(err.message);
        })
      );
    }));
  })

  updateCompany$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateCompany), switchMap((action) => {
      return this.companyService.updateCompany(action.company).pipe(
        map((data) => {
          this.toastr.success(data.message, 'Success');
          this.store.dispatch(setFormLoading({status: false}));
          this.store.dispatch(setModalStatus({status: false}))
          return updateCompanySuccess({company: action.company});
        }),
        catchError((err: any) => {
          this.toastr.error(err.message, 'Error');
          this.store.dispatch(setModalStatus({status: false}))
          this.store.dispatch(setFormLoading({status: false}));
          return of(err.message);
        })
      );
    }))
  })

  deleteCompany$ = createEffect(() => {
    return this.actions$.pipe(ofType(deleteCompany), switchMap((action) => {
      return this.companyService.deleteCompany(action.company).pipe(
        map((data) => {
          this.store.dispatch(setLoadingSpinner({status: false}));
          this.toastr.success('Company deleted');
          return deleteCompanySuccess({id: action.company.id});
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
