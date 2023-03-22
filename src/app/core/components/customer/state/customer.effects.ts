import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap, of, switchMap} from "rxjs";
import {setErrorMsg, setFormLoading, setLoadingSpinner, setModalStatus} from "../../../store/Shared/shared.actions";
import {catchError} from "rxjs/operators";
import {Customer} from "../../../models/customer.model";
import {Update} from "@ngrx/entity";
import {addCustomer, addCustomerSuccess, deleteCustomer, deleteCustomerSuccess, emptyCustomersArray, emptyCustomersArraySuccess, loadCustomers, loadCustomersSuccess, updateCustomer, updateCustomerSuccess} from "./customer.actions";
import {Store} from "@ngrx/store";
import {CoreAppState} from "../../../store/app.state";
import {CustomerService} from "../../../services/customer.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class CustomerEffects {

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private store: Store<CoreAppState>,
    private toastr: ToastrService,
  ) {
  }

  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCustomers),
      mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({status: true}))
        return this.customerService.getCustomers(action.filters).pipe(
          map((customers) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return loadCustomersSuccess({customers});
          }),
          catchError((err: any) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            return of(setErrorMsg({message: err.message}));
          })
        );
      })
    )
  })

  emptyCustomersArray$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(emptyCustomersArray),
      mergeMap((action) => {
        const customers: Customer[] = [];
        return of(emptyCustomersArraySuccess({customers}));
      })
    )
  })

  addCustomer$ = createEffect(() => {
    return this.actions$.pipe(ofType(addCustomer), mergeMap((action) => {
      return this.customerService.addCustomer(action.customer).pipe(
        map((data) => {
          const customer = {...action.customer, ...data.data.data};
          this.toastr.success('Customer saved');
          this.store.dispatch(setFormLoading({status: false}));
          action.msg == 'close' ? this.store.dispatch(setModalStatus({status: false})) : null;
          return addCustomerSuccess({customer});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          this.store.dispatch(setFormLoading({status: false}));
          return of(err.message);
        })
      );
    }));
  })

  updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateCustomer), switchMap((action) => {
      return this.customerService.updateCustomer(action.customer).pipe(
        map((data) => {
          this.toastr.success(data.message, 'Success');
          this.store.dispatch(setFormLoading({status: false}));
          this.store.dispatch(setModalStatus({status: false}))
          return updateCustomerSuccess({customer: action.customer});
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

  deleteCustomer$ = createEffect(() => {
    return this.actions$.pipe(ofType(deleteCustomer), switchMap((action: any) => {
      return this.customerService.deleteCustomer(action.id).pipe(
        map((data) => {
          this.toastr.success('Customer deleted');
          this.store.dispatch(setLoadingSpinner({status: false}));
          return deleteCustomerSuccess({id: action.id});
        }),
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          this.store.dispatch(setLoadingSpinner({status: false}));
          return of(err.message);
        }),
      );
    }))
  });

}
